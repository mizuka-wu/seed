<template>
  <div>
    <!-- filter -->
    <SeedFilter v-bind="$props" @search="handleSearch" />
    <!-- table -->
    <SeedTable v-loading="loading" :data="data" v-bind="$props" />
    <!-- form -->
    <SeedFrom v-if="false" ref="form" v-bind="$props" />
    <!-- pagination -->
    <SeedPagination
      @change:params="
        paginationParams => (params = { ...params, ...paginationParams })
      "
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
      required: true
    },
    lazy: {
      type: Boolean,
      required: false,
      default: false
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
      data: [],
      fetchData: () => {},
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
    queryParams() {
      const params = this.params;
      if (params) {
        return Object.assign({}, params);
      }
      return undefined;
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
    this.fetchData = debounce(async function(reset = false) {
      const params = Object.assign(
        {},
        vm.queryParams,
        reset
          ? {
              pageIndex: 1
            }
          : null
      );

      /**
       * 获取数据
       */
      try {
        vm.loading = true;
        const { data, pageSize, pageIndex, totalNumber } = await vm.fetchList(
          params
        );

        vm.data = data;

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
