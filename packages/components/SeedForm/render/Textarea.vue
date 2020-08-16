<!-- @format -->

<template>
  <el-input v-model="data" type="textarea" v-bind="seed.options"></el-input>
</template>

<script>
/** @format */
export default {
  props: {
    seed: {
      type: Object,
      required: true
    },
    value: {
      type: String
    }
  },
  computed: {
    data: {
      get() {
        return this.value || "";
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style>
/** @format */
</style>
