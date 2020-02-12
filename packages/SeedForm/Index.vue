<template>
  <component :is="dialogType ? 'el-dialog' : 'div'" :visible="true">
    hello
  </component>
</template>

<script>
export default {
  props: {
    dialogType: {
      type: Boolean,
      required: false,
      default: true
    }
  }
};
</script>

<style>
</style>