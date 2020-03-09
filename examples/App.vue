<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <Seed
      :fetchList="fetchList"
      :seeds="seeds"
      :addItem="addItem"
      :updateItem="updateItem"
      :deleteItem="deleteItem"
    >
      <el-button
        size="small"
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
          },
          options: {
            required: true
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
    },
    addItem(row) {
      return resource.addItem(row);
    },
    updateItem(row) {
      return resource.updateItem(row);
    },
    deleteItem(row) {
      return resource.deleteItem(row);
    }
  }
};
</script>
