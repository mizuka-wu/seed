<template>
  <el-dialog :visible.sync="visible">
    <template slot="title">
      {{ isEdit ? "编辑" : "添加" }}
      <slot name="title" />
    </template>
    <SeedForm
      ref="form"
      :seeds="formSeeds"
      v-if="visible"
      v-on="$listeners"
      v-bind="$attrs"
    /> </el-dialog
></template>

<script>
/**
 * 提供一个dialog的封装
 */
import SeedForm from "./components/SeedForm/Index";
export default {
  components: {
    SeedForm
  },
  name: "SeedFromContainer",
  props: {
    seeds: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      formSeeds: [],
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
  },
  watch: {
    seeds: {
      immediate: true,
      handler(seeds = []) {
        this.formSeeds = seeds.map(({ options = {}, ...seed }) => ({
          ...seed,
          ...(options.form || {})
        }));
      }
    }
  }
};
</script>
