<template>
  <div>
    <!-- filter -->
    <SeedFilter v-if="fetchList" v-bind="$attrs" @search="handleSearch" />
    <!-- table -->
    <SeedTable v-loading="loading" :data="data" v-bind="$attrs" />
    <!-- form -->
    <SeedFrom v-if="false" ref="form" v-bind="$attrs" />
    <!-- pagination -->
    <SeedPagination
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
import SeedPagination from "./SeedPagination.vue";
import SeedTable from "./SeedTable.vue";
import SeedFrom from "./SeedFrom.vue";
import SeedFilter from "./SeedFilter.vue";

// 函数
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";
import guid from "./lib/guid";

export default {
  components: {
    SeedPagination,
    SeedTable,
    SeedFrom,
    SeedFilter
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
      type: String,
      default: "id"
    },
    extraParams: {
      type: Object
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
          params && this.fetchData();
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
