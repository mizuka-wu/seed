<!-- @format -->

<template>
  <div class="form-upload">
    <el-upload
      action
      :data="uploadConfig.data"
      :accept="uploadConfig.accept"
      ref="uploader"
      :multiple="false"
      :limit="1"
      :file-list="files"
      :with-credentials="true"
      :before-upload="onBeforeUpload"
      :http-request="uploadRequest"
      :on-success="onSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div>{{ fileUrl }}</div>
    </el-upload>
  </div>
</template>

<script>
/** @format */

// import axios from 'axios'
import * as qiniu from 'qiniu-js'
export default {
  props: {
    value: {
      type: String,
    },
    item: {
      type: Object,
      required: true,
    },
    form: {
      type: Object,
      required: false,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  data() {
    const options = this.item.options || {}
    let uploadConfig = Object.assign(
      {},
      {
        data: options.data(this.form, this.item),
        accept: options.accept || '*/*',
      },
      {
        validator: options.validator && options.validator.bind(this),
      }
    )
    return {
      files: [],
      fileUrl: '',
      uploadConfig,
    }
  },
  watch: {
    value() {
      if (!this.value) {
        this.fileUrl = this.value
        this.files = []
      }
    },
    form() {
      const data = this.item.options.data(this.form, this.item)
      this.uploadConfig.data = data
    },
  },
  methods: {
    getToken() {
      const getToken = this.item.options.getToken.bind(this)
      if (getToken) {
        return getToken().then(res => {
          return res.data.data.params
        })
      } else {
        return Promise.reject(new Error('no upload token'))
      }
    },
    uploadRequest(option) {
      this.getToken().then(tokenRes => {
        var observable = qiniu.upload(option.file, tokenRes.key, tokenRes.token)
        observable.subscribe({
          next: progress => {
            option.onProgress(
              {
                percent: progress.total.percent,
              },
              option.file,
              option.fileList
            )
          },
          error: option.onError,
          complete: res => {
            option.onSuccess(
              {
                data: tokenRes.fileUrl,
              },
              option.file,
              option.fileList
            )
          },
        })
      })
    },
    onBeforeUpload(file) {
      return this.uploadConfig.validator
        ? this.uploadConfig.validator(file)
        : true
    },
    onSuccess(resp, file, fileList) {
      this.$emit('input', resp.data)
      this.fileUrl = resp.data
    },
  },
}
</script>
