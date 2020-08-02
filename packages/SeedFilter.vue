<template>
  <el-card shadow="hover">
    <!-- 查询系统 -->
    <el-row>
      <SeedForm ref="form" v-bind="$attrs" :seeds="filterSeeds" inline />
    </el-row>
    <!-- 查询，重制按钮 -->
    <el-row>
      <el-button size="small" @click="handlerSearch" type="primary"
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
import SeedForm from "#/components/SeedForm/Index";
import optionsHelper from "./lib/options";
export default {
  components: {
    SeedForm
  },
  name: "SeedFilterContainer",
  props: {
    seeds: {
      type: Array,
      required: true
    }
  },
  computed: {
    filterSeeds: ({ seeds }) => optionsHelper(seeds, "filter")
  },
  methods: {
    handlerSearch() {
      const form = this.$refs.form;
      this.$emit("search", form.model);
    }
  }
};
</script>
