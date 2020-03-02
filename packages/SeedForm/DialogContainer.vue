<template>
  <el-dialog :visible.sync="visible">
    <SeedForm v-on="$listeners" v-bind="$props" /> </el-dialog
></template>

<script>
/**
 * 提供一个dialog的封装
 */
import SeedForm from "./Index";
export default {
  components: {
    SeedForm
  },
  props: {},
  data() {
    return {
      visible: true
    };
  },
  methods: {}
};
</script>
