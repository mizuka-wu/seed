<template>
  <div class="seed-container">
    <!-- filter -->
    <SeedFilter
      ref="filter"
      v-if="fetchList"
      v-bind="$attrs"
      @search="handleSearch"
      :seeds="seeds"
    />
    <!-- table -->
    <SeedTable
      ref="table"
      v-loading="loading"
      :data="data"
      v-bind="$attrs"
      :seeds="seeds"
    >
      <template #tools>
        <ElButton size="small" type="success" @click="exportExcel">
          导出为Excel
        </ElButton>
        <ExcelUploader
          :seeds="seeds"
          @uploaded="rows => $emit('uploaded', rows)"
        />
      </template>
    </SeedTable>
    <!-- pagination -->
    <SeedPagination
      @scrollUp="scrollUp"
      v-if="fetchList"
      :params.sync="paginationParams"
      ref="pagination"
    />
  </div>
</template>

<script>
/**
 * 容器组件，负责基本布局系统，传递参数
 * @todo 探讨是不是需要拆成mixins
 */
import SeedPagination from "seed/packages/blocks/SeedPagination.vue";
import SeedTable from "seed/packages/blocks/SeedTable.vue";
import SeedFilter from "seed/packages/blocks/SeedFilter.vue";
import { Notification } from "element-ui";
import ExcelUploader from "seed/packages/components/ExcelUploader";

// 函数
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";
import guid from "seed/lib/guid";
import optionsHelper from "seed/lib/options.js";
import { generateExcel, download } from "seed/lib/excel";

const OFFSET = 16; // table距离filter的偏移量，保证不完全吸顶

export default {
  components: {
    SeedPagination,
    SeedTable,
    SeedFilter,
    ExcelUploader
  },
  props: {
    /**
     * 获取数据
     */
    fetchList: {
      type: Function,
      required: false
    },
    lazy: {
      type: Boolean,
      required: false,
      default: false
    },
    rowKey: {
      type: String
    },
    extraParams: {
      type: Object
    },
    seeds: {
      type: Array,
      required: true
    }
  },
  data() {
    // const vm = this;
    return {
      params: null,
      paginationParams: null,
      data: [],
      fetchData: null,
      loading: false
    };
  },
  methods: {
    handleSearch(params) {
      this.$nextTick(() => {
        this.params = params;
        this.$refs.pagination.reset();
      });
    },
    scrollUp() {
      this.$nextTick(() => {
        const table = this.$refs.table;
        const { top } = table.$el.getBoundingClientRect();
        window.scrollTo({
          top: top + window.scrollY - OFFSET,
          behavior: "smooth"
        });
      });
    },
    refresh() {
      this.fetchData && this.fetchData();
    },
    async exportExcel() {
      const seeds = optionsHelper(this.seeds, "table");
      const { fetchList, queryParams } = this;

      /**
       * 获取数据
       */
      const notify = Notification({
        title: "导出Excel中",
        position: "bottom-right",
        message: "正在拉取全部数据......",
        duration: 0
      });

      let rows = [];
      const pagination = this.$refs.pagination;

      const { totalNumber = 0, pageSize = 20 } = pagination || {};

      // 生成页码
      let pageIndexs = Object.keys(
        Array.from(new Array(Math.ceil(totalNumber / pageSize)))
      ).map(index => +index + 1);

      // 导出
      try {
        await Promise.race([
          // 停止导出
          new Promise((resolve, reject) => {
            notify.onClose = function() {
              reject(new Error("手动停止导出！"));
            };
          }),
          (async function() {
            for (let pageIndex of pageIndexs) {
              const { data } = await fetchList({
                ...queryParams,
                pageSize,
                pageIndex
              });
              rows = rows.concat(data);
              notify.message = `数据拉取中 ${pageIndex}/${pageIndexs.length} ....`;
            }
          })()
        ]);
      } catch (e) {
        this.$mesasge.error(e.message);
      }

      const workbook = await generateExcel(rows, seeds);
      notify.close();
      download(workbook);
    }
  },
  computed: {
    /**
     * 混合之后的params, 分页的未初始化的话，不进行请求
     */
    queryParams({ paginationParams, params, extraParams }) {
      return {
        ...paginationParams,
        ...params,
        ...extraParams
      };
    }
  },
  watch: {
    queryParams: {
      immediate: true,
      handler(params, oldParams) {
        // 初次生成配置是否需要请求数据
        if (this.lazy && !oldParams) {
          return;
        }
        if (isEqual(params, oldParams)) {
          return;
        }
        this.$nextTick(() => {
          params && this.refresh();
        });
      }
    }
  },
  created() {
    const vm = this;
    if (!this.fetchList) {
      return;
    }
    this.fetchData = debounce(async function(reset = false) {
      const params = {
        ...vm.queryParams,
        ...(reset
          ? {
              pageIndex: 1
            }
          : null)
      };

      /**
       * 获取数据
       */
      try {
        vm.loading = true;
        const { data, pageSize, pageIndex, totalNumber } = await vm.fetchList(
          params
        );

        vm.data = data.map(item =>
          Object.assign(
            {
              _key: item[this.rowKey] || guid()
            },
            item
          )
        );

        /**
         * 修改整个pagination
         */
        const pagination = vm.$refs.pagination;

        pagination.pageSize = pageSize;
        pagination.pageIndex = pageIndex;
        pagination.totalNumber = totalNumber;
      } catch (e) {
        this.$message.error(e.message);
      }
      vm.loading = false;
    }, 100);
  }
};
</script>
<style lang="stylus" scoped>
.seed-container
  padding 10px
</style>
