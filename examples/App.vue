<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <Seed :fetch-list="fetchList" :seeds="seeds">
      <el-button
        size="mini"
        type="danger"
        slot-scope="{ rows }"
        slot="batchList"
        >{{ rows.length }}已选择</el-button
      >
    </Seed>
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
          key: "name",
          label: "名字",
          render(h, value) {
            return <div>"{value}"</div>;
          }
        },
        {
          key: "address",
          label: "地址"
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
