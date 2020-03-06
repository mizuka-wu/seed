<template>
  <el-form :model="form" :inline="inline" v-if="form">
    <el-form-item
      :key="formItem.key"
      v-for="formItem of seeds"
      :label="formItem.label || formItem.key"
    >
      <el-input v-model="form[formItem.key]"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import components from "./render";

export default {
  components,
  props: {
    seeds: {
      type: Array
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultForm: null,
      form: {}
    };
  }
};
</script>

<style></style>
