<template>
  <el-card shadow="hover">
    <!-- 查询系统 -->
    <el-row>
      <el-form :inline="true">
        <el-form-item
          v-for="param of seeds"
          :key="param.key"
          :label="param.label || param.key"
        >
          <el-input v-model="params[param.key]" />
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 查询，重制按钮 -->
    <el-row>
      <el-button size="small" @click="$emit('search')" type="primary"
        >查询</el-button
      >
      <el-button size="small" @click="$emit('reset')">重置</el-button>
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
      params: {}
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
