<!-- @format -->

<template>
  <div class="form-upload">
    <el-upload
      :action="uploadConfig.path"
      :data="uploadConfig.data"
      :accept="uploadConfig.accept"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleChange"
      :file-list="files"
      ref="uploader"
      :with-credentials="true"
      :auto-upload="false"
      :before-upload="fileCheck"
      :on-change="handleChange"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
      <div v-if="item.description" slot="tip" class="el-upload__tip">{{ item.description }}</div>
    </el-upload>
    <!-- 上传按钮 -->
    <el-button
      v-if="$refs.uploader"
      :disabled="uploadDisabled"
      @click="$refs.uploader.submit"
      style="margin-top: 10px;"
      size="large"
      type="primary"
    >上传</el-button>
  </div>
</template>

<script>
/**
 * 因为后端只会上传一个文件地址，和element的标准结构有所区别
 *
 * @format
 */

import prettyBytes from 'pretty-bytes'
export default {
  props: {
    value: {
      type: [String, Array],
    },
    item: {
      type: Object,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let uploadConfig = Object.assign(
      {},
      {
        path: '/opapi/file/upload',
        data: {
          name: 'poster',
          prefix: 'misc',
        },
        maxSize: 1024 * 1024,
        accept: 'image/jpeg,image/png,image/gif',
      },
      this.item.validator
    )
    return {
      uploadConfig: uploadConfig,
      files: this.initFiles(), // 需要转换成标准格式
    }
  },
  computed: {
    // 判断list是否只能传一个用的 默认应该是unique
    isUnique() {
      return !this.item.multiple
    },
    // 自动禁止上传
    uploadDisabled() {
      return !this.files.filter(file => file.status !== 'success').length
    },
    maxFiles() {
      // 有指定用指定，否则无所谓
      return this.multiple ? this.uploadConfig.max || 999 : 1
    },
    isVerify() {
      return this.$store.state.seed.isVerify
    },
  },
  methods: {
    initFiles() {
      let files = this.multiple ? this.value : [this.value]
      return files
        .filter(file => file)
        .map(file => ({ name: file, url: file, status: 'success' }))
    },
    // size格式化
    sizeFormatter(value = 0) {
      return prettyBytes(value)
    },
    // 上传文件检测
    fileCheck(file) {
      let { width, height, maxSize } = this.uploadConfig
      let showMessage = this.$message.error
      if (maxSize < file.size) {
        showMessage('图片超过大小限制:  ' + this.sizeFormatter(maxSize))
        return false
      }
      // 宽度高度校验，需呀生成一张临时图片
      if (this.isVerify && (width || height)) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader()
          reader.onerror = reject
          reader.onload = function(e) {
            let src = e.target.result
            let image = new Image()
            // 加载图片
            image.onload = function() {
              let err = ''
              if (width && image.width != width) {
                err += `图片宽度${image.width} 不等于 ${width}`
              }
              if (height && image.height != height) {
                err += `图片高度${image.height} 不等于 ${height}`
              }
              if (err) {
                showMessage(err)
                reject(new Error(err))
              }
              resolve()
            }
            image.onerror = reject
            image.src = src
          }
          reader.readAsDataURL(file)
        })
      }
      return true
    },
    // 预览
    handlePictureCardPreview(file) {
      this.$alert(`<img src="${file.url}" width="100%" />`, file.name, {
        dangerouslyUseHTMLString: true,
        showClose: false,
      })
    },
    handleChange(file, fileList) {
      if (this.isUnique && fileList.length > 1) {
        fileList.shift()
      }
      // 更新回去，如果有上传成功的，就删除掉response
      this.files = fileList.map(file => {
        if (file.response && file.status === 'success') {
          file.url = file.response.data
          delete file.response
          delete file.raw
        }
        return file
      })
    },
  },
  watch: {
    value() {
      this.files = this.initFiles()
    },
    // 更新value 决定是否显示upload button的
    files: {
      immediate: true,
      handler(files) {
        let value = files
          .filter(file => file.status === 'success')
          .map(file => file.url)
        if (this.isUnique) {
          value = value.length > 0 ? value[0] : ''
        }
        this.$emit('input', value)
        /**
         * 检测是否能够显示上传按钮
         */
        this.$nextTick(() => {
          let uploader = this.$refs.uploader
          if (uploader) {
            let uploadButton = uploader.$el.querySelector('.el-upload')
            let maxFiles = this.isVerify ? this.maxFiles : 99999
            if (files.length >= maxFiles) {
              uploadButton.style.visibility = 'hidden'
            } else {
              uploadButton.style.visibility = 'visible'
            }
          }
        })
      },
    },
  },
}
</script>
<style lang="less">
/** @format */

.form-upload {
  .el-upload-list__item.is-ready:after {
    content: '尚未上传';
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
