<template>
  <ClientOnly>
    <SeedContainer class="seed-demo" v-bind="$attrs" />
  </ClientOnly>
</template>

<script>
import SeedContainer from "../../../packages/SeedContainer.vue";
export default {
  components: {
    SeedContainer
  }
};
</script>
<style lang="stylus">
// 修复组件内因为外部主题导致的样式问题
.seed-demo
  th, td
    border initial
</style>