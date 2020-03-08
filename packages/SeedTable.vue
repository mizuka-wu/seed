<template>
  <div class="table-container">
    <SeedTable v-bind="$attrs" :seeds="tableSeeds" v-on="$listeners">
      <!-- 基础控制 -->
      <el-button size="mini" type="primary">添加</el-button>
      <!-- 批量 -->
      <el-button
        size="mini"
        type="danger"
        slot="batchList"
        slot-scope="{ rows }"
        >测试{{ rows.length }}</el-button
      >
    </SeedTable>
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
    tableSeeds({ seeds }) {
      return optionsHelper(seeds, "table");
    }
  }
};
</script>

<style lang="less" scoped>
.table-container {
  margin: 16px 0;
}
</style>
