<template>
  <el-card shadow="hover">
    <!-- 查询系统 -->
    <el-row>
      <el-form></el-form>
    </el-row>
    <!-- 查询，重制按钮 -->
    <el-row>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: "SeedFilter",
  props: {
    seeds: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      params() {}
    };
  },
  watch: {
    seeds: {
      immediate: true,
      handler(seeds) {
        console.log(seeds);
      }
    }
  }
};
</script>
