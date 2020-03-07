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
const DEFAULT_PAGESIZE = 10;

export default {
  data() {
    return {
      pageSize: 10,
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
    }
  }
};
</script>
<style lang="stylus" scoped>
.container
  width 100%
  text-align center
</style>
