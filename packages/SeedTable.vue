<template>
  <SeedTable v-bind="$attrs" :seeds="tableSeeds" v-on="$listeners" />
</template>

<script>
import SeedTable from "./components/SeedTable/Index.vue";
export default {
  components: {
    SeedTable
  },
  name: "SeedTableContainer",
  props: {
    seeds: {
      type: Array,
      required: true
    }
  },
  computed: {
    tableSeeds() {
      const seeds = this.seeds || [];
      return seeds.map(({ options = {}, ...seed }) => ({
        ...seed,
        ...(options.table || {})
      }));
    }
  }
};
</script>

<style></style>
