<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <Seed :fetch-list="fetchList" :seeds="seeds" />
  </div>
</template>

<script>
import Seed from "../packages/SeedContainer.vue";
import resource from "./mock/resource";

export default {
  name: "app",
  components: {
    Seed
  },
  data() {
    return {
      seeds: [
        {
          key: "name"
        },
        {
          key: "address"
        },
        {
          key: "pic"
        },
        {
          key: "description"
        },
        {
          key: "blog"
        },
        {
          key: "ip"
        },
        {
          key: "birthday"
        },
        {
          key: "addtime"
        },
        {
          key: "updatetime"
        }
      ]
    };
  },
  methods: {
    fetchList(params) {
      return resource.getList(params);
    }
  }
};
</script>
