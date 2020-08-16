<template>
  <div class="container">
    <el-pagination
      @size-change="size => (pageSize = size)"
      @current-change="index => (pageIndex = index)"
      :current-page="pageIndex"
      :page-sizes="[10, 30, 60, 90]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNumber"
    />
  </div>
</template>

<script>
const DEFAULT_PAGESIZE = 2;

export default {
  name: "SeedPaginationContainer",
  data() {
    return {
      pageSize: DEFAULT_PAGESIZE,
      pageIndex: 1,
      totalNumber: 0
    };
  },
  computed: {
    params() {
      const { pageSize, pageIndex } = this;
      return { pageSize, pageIndex };
    }
  },
  methods: {
    reset() {
      this.pageSize = DEFAULT_PAGESIZE;
      this.pageIndex = 1;
      this.totalNumber = 0;
    }
  },
  watch: {
    params: {
      immediate: true,
      handler(params) {
        this.$emit("update:params", params);
      }
    },
    pageIndex(index) {
      if (index > 1) {
        this.$emit("scrollUp");
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.container
  width 100%
  text-align center
</style>
