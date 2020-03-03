<template>
  <div class="table-container">
    <!-- 控制器层 -->
    <el-row>
      <el-button size="mini" type="primary">添加</el-button>
    </el-row>
    <SeedTable v-bind="$attrs" :seeds="tableSeeds" v-on="$listeners" />
  </div>
</template>

<script>
import SeedTable from "./components/SeedTable/Index.vue";
import optionsHelper from "./lib/options";
export default {
  components: {
    SeedTable
  },
  name: "SeedTableContainer",
  props: {
    seeds: {
      type: Array,
      required: true
    }
  },
  computed: {
    tableSeeds() {
      return optionsHelper(this.seeds, "table");
    }
  }
};
</script>

<style lang="less" scoped>
.table-container {
  margin: 16px 0;
}
</style>
