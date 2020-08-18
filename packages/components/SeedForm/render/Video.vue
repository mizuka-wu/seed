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
      <!-- 缩略图 -->
      <div
        slot="file"
        slot-scope="{ file }"
        style="background: #000000; height: 100%"
      >
        <video class="el-upload-list__item-thumbnail" :src="file.url" />
        <label
          class="el-upload-list__item-status-label"
          v-if="file.status === 'success'"
          ><i class="el-icon-upload-success el-icon-check"></i
        ></label>
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
      <!-- 上传按钮 -->
      <template>
        <i class="el-icon-plus"></i>
        <div
          v-if="(seed.options || {}).description"
          slot="tip"
          class="el-upload__tip"
        >
          {{ (seed.options || {}).description }}
        </div>
      </template>
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
import Image from "./Image";

export default {
  extends: Image,
  data() {
    return {
      accept: "video/mp4"
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.$alert(
        `<video controls="controls" src="${file.url}" width="100%" />`,
        file.name,
        {
          dangerouslyUseHTMLString: true,
          showClose: false
        }
      );
    },
    handleRemove(file) {
      const index = this.files.findIndex(item => item === file);
      if (index > -1) {
        this.files.splice(index, 1);
      }
    }
  }
};
</script>
