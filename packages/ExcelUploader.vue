<template>
  <el-popover placement="top" width="200">
    <el-steps direction="vertical">
      <el-step title="步骤 1" description="下载对应模版进行填写">
        <template #title>
          <el-button type="text" style="padding: 0" @click="downloadTemplate"
            >下载模版</el-button
          >
        </template>
      </el-step>
      <el-step description="上传excel">
        <template #title>
          <input type="file" ref="fileReader" @change="readExcelFromTemplate" />
        </template>
      </el-step>
    </el-steps>
    <el-button
      style="margin: 0 8px;"
      slot="reference"
      size="small"
      type="success"
      plain
    >
      <slot>Excel批量操作</slot>
    </el-button>
  </el-popover>
</template>

<script>
import { download, readExcelFromTemplate, generateExcel } from "./lib/excel";
import optionsHelper from "./lib/options";
export default {
  props: {
    seeds: {
      type: Array,
      required: true
    }
  },
  computed: {
    excelSeeds({ seeds }) {
      return optionsHelper(seeds, "excel");
    }
  },
  methods: {
    async readExcelFromTemplate(e) {
      const file = e.target.files[0];
      if (file) {
        const rows = await readExcelFromTemplate(file, this.excelSeeds);
        this.$emit("uploaded", rows);
      }
      this.$refs.fileReader.value = "";
    },
    async downloadTemplate() {
      await download(generateExcel([], this.excelSeeds));
    }
  }
};
</script>
