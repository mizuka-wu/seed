<!-- @format -->

<template>
  <div class="form-upload">
    <el-upload
      action="/"
      :accept="accept"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleChange"
      :file-list="files"
      ref="uploader"
      :with-credentials="true"
      :auto-upload="false"
      :before-upload="fileCheck"
      :on-change="handleChange"
      :http-request="handleUpload"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
      <div
        v-if="(seed.options || {}).description"
        slot="tip"
        class="el-upload__tip"
      >
        {{ (seed.options || {}).description }}
      </div>
    </el-upload>
    <!-- 上传按钮 -->
    <el-button
      v-if="$refs.uploader"
      :disabled="uploadDisabled"
      @click="$refs.uploader.submit"
      style="margin-top: 10px;"
      size="large"
      type="primary"
      >上传</el-button
    >
  </div>
</template>

<script>
/**
 * 因为后端只会上传一个文件地址，和element的标准结构有所区别
 *
 * @format
 */

import prettyBytes from "pretty-bytes";
export default {
  props: {
    value: {
      type: String,
      required: false
    },
    seed: {
      type: Object
    }
  },
  data() {
    return {
      accept: "image/jpeg,image/png,image/jpg",
      files: this.initFiles() // 需要转换成标准格式
    };
  },
  computed: {
    // 判断list是否只能传一个用的 默认应该是unique
    isUnique() {
      return !(this.seed.options || {}).multiple;
    },
    // 自动禁止上传
    uploadDisabled() {
      const files = this.files || [];
      return (
        // 无可上传的
        !files.filter(file => file.status !== "success").length &&
        // 最大数量超了
        files.length >= this.maxFiles
      );
    },
    maxFiles() {
      // 有指定用指定，否则无所谓
      return this.multiple ? (this.seed.options || {}).maxFiles || 999 : 1;
    }
  },
  methods: {
    initFiles() {
      const { multiple = false } = {};
      let files = (multiple ? this.value : [this.value])
        .filter(file => file)
        .map(file => {
          return {
            ...(typeof file === "string"
              ? {
                  name: file,
                  url: file
                }
              : file),
            status: "success"
          };
        });
      return [
        ...files,
        ...(this.files || []).filter(({ status }) => status !== "success")
      ];
    },
    // size格式化
    sizeFormatter(value = 0) {
      return prettyBytes(value);
    },
    // 上传文件检测
    fileCheck(file) {
      const { options = {} } = this.seed;
      if (options.fileCheck) {
        return options.fileCheck(file);
      }
      return true;
    },
    // 预览
    handlePictureCardPreview(file) {
      this.$alert(`<img src="${file.url}" width="100%" />`, file.name, {
        dangerouslyUseHTMLString: true,
        showClose: false
      });
    },
    handleChange(file, fileList) {
      if (this.isUnique && fileList.length > 1) {
        fileList.shift();
      }
      // 更新回去，如果有上传成功的，就删除掉response
      this.files = fileList.map(file => {
        if (file.response && file.status === "success") {
          file.url = file.response.data;
          delete file.response;
          delete file.raw;
        }
        return file;
      });
    },
    /**
     * 上传
     */
    handleUpload(options) {
      this.$seedRender.fileUploader(options);
    }
  },
  watch: {
    value() {
      this.files = this.initFiles();
    },
    // 更新value 决定是否显示upload button的
    files: {
      handler(files = []) {
        let value = files
          .filter(file => file.status === "success")
          .map(file => file.url);
        if (this.isUnique) {
          value = value.length > 0 ? value[0] : "";
          this.$emit("input", value);
        } else {
          // 多选情况需要先判断数组有没有变化
          if (value.sort().join() !== this.value.sort().join()) {
            this.$emit("input", value);
          }
        }
      }
    }
  }
};
</script>
<style lang="less">
/** @format */

.form-upload {
  .el-upload-list__item.is-ready:after {
    content: "尚未上传";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20px;
    font-weight: 600;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
  }
}
</style>
