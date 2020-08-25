<template>
  <div id="app">
    <Seed :fetchList="fetchList" :border="true" :seeds="seeds" />
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
            width: 200,
            required: true
            // fixed: "left"
          }
        },
        {
          key: "status",
          render: "enum",
          label: "状态",
          options: {
            enum: ENUM
          }
        },
        {
          key: "address"
        },
        {
          key: "description",
          options: {
            width: 300
          }
        },
        {
          key: "blog"
        },
        {
          key: "ip"
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
