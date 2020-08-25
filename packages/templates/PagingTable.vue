<script>
/**
 * 容器组件，负责基本布局系统，传递参数
 */
import SeedPagination from "seed-toolkit/packages/blocks/SeedPagination.vue";
import SeedTable from "seed-toolkit/packages/blocks/SeedTable.vue";
import SeedFilter from "seed-toolkit/packages/blocks/SeedFilter.vue";
import { Notification } from "element-ui";
import ExcelUploader from "seed-toolkit/packages/components/ExcelUploader";

// 函数
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";
import guid from "seed-toolkit/lib/guid";
import optionsHelper from "seed-toolkit/lib/options.js";
import { generateExcel, download } from "seed-toolkit/lib/excel";

const OFFSET = 16; // table距离filter的偏移量，保证不完全吸顶

export default {
  render() {
    const vm = this;
    const {
      fetchList,
      $attrs,
      $slots,
      $scopedSlots,
      seeds,
      refresh,
      handleSearch,
      loading,
      data,
      exportExcel,
      scrollUp,
      paginationParams,
      excel
    } = vm;

    // excel 上传下载配置
    const excelConfig =
      excel === true
        ? {
            upload: true,
            download: true
          }
        : excel || {};

    const excelUpload = excelConfig.upload;
    const excelDownload = excelConfig.download;

    return (
      <div class="seed-container">
        {fetchList && (
          <SeedFilter
            scopedSlots={$scopedSlots}
            ref="filter"
            issueSlots={true}
            {...$attrs}
            onSearch={handleSearch}
            seeds={seeds}
          ></SeedFilter>
        )}
        <SeedTable
          ref="table"
          {...$attrs}
          scopedSlots={$scopedSlots}
          v-loading={loading}
          data={data}
          issueSlots={true}
          seeds={seeds}
          onRefresh={refresh}
        >
          {$slots.default}
          {excelDownload && (
            <ElButton size="small" type="success" onClick={exportExcel}>
              导出为Excel
            </ElButton>
          )}
          {excelUpload && (
            <ExcelUploader
              seeds={seeds}
              onUploaded={rows => vm.$emit("uploaded", rows)}
            />
          )}
        </SeedTable>
        {fetchList && (
          <SeedPagination
            onScrollUp={scrollUp}
            params={paginationParams}
            ref="pagination"
            on={{ "update:params": e => (vm.paginationParams = e) }}
          />
        )}
      </div>
    );
  },
  components: {
    SeedPagination,
    SeedTable,
    SeedFilter,
    ExcelUploader
  },
  name: "pagingTable",
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
    },
    excel: {
      type: [Boolean, Object],
      default: false
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
  padding 10px 0px
  width 100%
</style>
