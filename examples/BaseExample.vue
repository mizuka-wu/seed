<template>
  <div id="app">
    <SeedPagingTable
      :fetchList="fetchList"
      :seeds="seeds"
      :addItem="addItem"
      :deleteItem="deleteItem"
      :updateItem="updateItem"
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
      <template #table:blogRender="{ value }"> {{ value }} hello </template>
      <template>
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
          label: "地址",
          options: {
            table: {
              render(h, { props }) {
                return props.value + "11112121212";
              }
            }
          }
        },
        {
          key: "pic",
          label: "图片",
          render: "image"
        },
        {
          key: "video",
          label: "视频",
          render: "video",
          options: {}
        },
        {
          key: "description",
          render: "textarea"
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
