<template>
  <el-card shadow="hover">
    <!-- 查询系统 -->
    <el-row>
      <SeedForm ref="form" v-bind="$attrs" :seeds="filterSeeds" inline />
    </el-row>
    <!-- 查询，重制按钮 -->
    <el-row>
      <el-button
        size="small"
        @click="$emit('search', this.params)"
        type="primary"
        >查询</el-button
      >
      <el-button size="small" @click="$emit('reset')">重置</el-button>
    </el-row>
  </el-card>
</template>
<script>
/**
 * 内部使用SeedForm的查询条件生成系统
 */
import SeedForm from "./components/SeedForm/Index";
import optionsHelper from "./lib/options";
export default {
  components: {
    SeedForm
  },
  name: "SeedFilter",
  props: {
    seeds: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filterSeeds: [],
      params: {}
    };
  },
  watch: {
    seeds: {
      immediate: true,
      handler(seeds = []) {
        this.filterSeeds = optionsHelper(seeds, "filter");
      }
    }
  }
};
</script>
