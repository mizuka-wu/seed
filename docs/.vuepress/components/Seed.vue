<template>
  <ClientOnly>
    <SeedContainer
      class="seed-demo"
      v-bind="$attrs"
      :seeds="seeds"
      :fetchList="isShowFetchList ? fetchList : undefined"
    />
  </ClientOnly>
</template>

<script>
import SeedContainer from "../../../packages/SeedContainer.vue";
import ExampleApp from "../../../examples/App";
import resource from "../../../examples/mock/resource";
export default {
  extends: ExampleApp,
  props: {
    isShowFetchList: {
      type: Boolean,
      default: true
    }
  },
  components: {
    SeedContainer
  },
  methods: {
    fetchList(params) {
      return resource.getList(params);
    }
  }
};
</script>
<style lang="stylus">
// 修复组件内因为外部主题导致的样式问题
.seed-demo
  padding 10px
  border 1px solid #ddd
  margin 10px 0
  border-radius 4px
  table
    margin initial
  th, td
    border initial
</style>