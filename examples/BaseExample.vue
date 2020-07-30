<template>
  <div id="app">
    <Seed :fetchList="fetchList" :seeds="seeds" :addItem="addItem" sortable>
      <template #batchList="{ rows }">
        <el-button size="small" type="danger"
          >{{ rows.length }}已选择</el-button
        >
      </template>
      <template #control="scope">
        <el-button>审核{{ scope.row }}</el-button>
      </template>
      <template #tools>
        hello
      </template>
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
            return `"${value}"`;
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
