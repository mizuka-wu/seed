<template>
  <div id="app">
    <Seed :fetchList="fetchList" :seeds="seeds" />
  </div>
</template>

<script>
import resource, { ENUM } from "@/mock/resource";

export default {
  name: "app",
  data() {
    return {
      seeds: [
        {
          key: "name",
          label: "名字",
          options: {
            required: true
          }
        },
        {
          key: "status",
          render: "enum",
          label: "状态",
          options: {
            enum: ENUM
          }
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
