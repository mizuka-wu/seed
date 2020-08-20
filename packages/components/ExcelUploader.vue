<template>
  <el-popover placement="top" width="200">
    <el-steps direction="vertical">
      <el-step title="步骤 1" description="下载对应模版进行填写">
        <template #title>
          <el-button
            v-loading="loading"
            type="text"
            :disabled="loading"
            style="padding: 0"
            @click="downloadTemplate"
            >下载模版</el-button
          >
        </template>
      </el-step>
      <el-step description="上传excel">
        <template #title>
          <input
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            type="file"
            :disabled="loading"
            v-loading="loading"
            ref="fileReader"
            @change="readExcelFromTemplate"
          />
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
import {
  download,
  readExcelFromTemplate,
  generateExcel
} from "seed-toolkit/lib/excel";
import optionsHelper from "seed-toolkit/lib/options";
export default {
  props: {
    seeds: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
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
        this.loading = true;
        try {
          const rows = await readExcelFromTemplate(file, this.excelSeeds);
          this.$emit("uploaded", rows);
        } catch (e) {
          this.$message.error(e);
        }
      }
      this.loading = false;
      this.$refs.fileReader.value = "";
    },
    async downloadTemplate() {
      this.loading = true;
      try {
        await download(generateExcel([], this.excelSeeds));
      } catch (e) {
        this.$message.error(e);
      }
      this.loading = false;
    }
  }
};
</script>
