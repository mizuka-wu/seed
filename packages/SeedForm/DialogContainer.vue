<template>
  <el-dialog :visible.sync="visible">
    <template slot="title">
      {{ isEdit ? "编辑" : "添加" }}
      <slot name="title" />
    </template>
    <SeedForm
      ref="form"
      v-if="visible"
      v-on="$listeners"
      v-bind="$props"
    /> </el-dialog
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
  data() {
    return {
      visible: true,
      isEdit: false,
      form: null
    };
  },
  methods: {
    open(form = null) {
      this.isEdit = !!form;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.form.defaultForm = form;
      });
    }
  }
};
</script>
