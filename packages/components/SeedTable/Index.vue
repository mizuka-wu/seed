<template>
  <div>
    <el-table :data="data">
      <el-table-column
        v-for="column of columns"
        :key="column.key"
        :label="column.label"
        :prop="column.prop"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import components from "./render";
export default {
  components,
  name: "SeedTable",
  props: {
    data: {
      type: Array,
      required: true
    },
    seeds: {
      type: Array,
      required: true
    }
  },
  computed: {
    columns() {
      return this.seeds.map(seed => ({
        label: seed.title || seed.key,
        prop: seed.key
      }));
    }
  }
};
</script>
