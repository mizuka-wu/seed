<template>
  <SeedTable v-bind="$attrs" :seeds="tableSeeds" v-on="$listeners" />
</template>

<script>
import SeedTable from "./components/SeedTable/Index.vue";
import optionsHelper from "./lib/options";
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
      return optionsHelper(this.seeds, "table");
    }
  }
};
</script>

<style></style>
