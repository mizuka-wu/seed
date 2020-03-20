<template>
  <el-popover placement="top" width="160" v-model="visible">
    <p>这是一段内容这是一段内容确定删除吗？</p>
    <el-button slot="reference">
      <slot>批量操作</slot>
    </el-button>
  </el-popover>
</template>

<script>
// import { download, readExcelFromTemplate, generateExcel } from "./lib/excel";
export default {};
</script>
