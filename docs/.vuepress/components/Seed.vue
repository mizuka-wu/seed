<template>
  <ClientOnly>
    <SeedContainer v-bind="$attrs" />
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