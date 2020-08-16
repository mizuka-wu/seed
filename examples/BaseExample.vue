<template>
  <div id="app">
    <SeedPagingTable
      :fetchList="fetchList"
      :seeds="seeds"
      :addItem="addItem"
      sortable
    >
      <template #batchList="{ rows }">
        <el-button size="small" type="danger"
          >{{ rows.length }}已选择</el-button
        >
      </template>
      <template #control="scope">
        <el-button>审核{{ scope.row.name }}</el-button>
      </template>
      <template #tools>
        hello
      </template>
    </SeedPagingTable>
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
          key: "status",
          render: "enum",
          options: {
            enum: ENUM
          }
        },
        {
          key: "birthday"
        },
        {
          key: "addtime",
          render: "time"
        },
        {
          key: "updatetime",
          render: "time"
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
