<template>
  <el-form :model="form">
    hello
  </el-form>
</template>

<script>
export default {
  props: {
    seeds: {
      type: Array
    }
  },
  data() {
    return {
      defaultForm: null,
      form: null
    };
  }
};
</script>

<style></style>
