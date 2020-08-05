<!-- @format -->

<template>
  <div>
    <transition name="el-fade-in" mode="out-in">
      <!-- 富文本 -->
      <quill-editor
        v-model="form[item.key]"
        v-if="richText"
        :class="[validateState]"
        style="height: 215px;margin-bottom: 82px;"
        key="rich-text"
        @blur="blurHandler"
        ref="myQuillEditor"
        :options="options"
      >
      </quill-editor>
      <!-- 非富文本 -->
      <el-input
        :autosize="{ minRows: 5, maxRows: 15 }"
        v-else
        key="normal-text"
        v-model="form[item.key]"
        type="textarea"
      ></el-input>
    </transition>
    <el-switch
      style="margin-top: 10px; float: right;"
      v-model="richText"
      active-color="#13ce66"
      active-text="富文本"
      inactive-color="#ff4949"
    >
    </el-switch>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import axios from 'axios'
/**
 * 自动注册一系列的inline-style
 * 改写image的函数改成调用后端接口那种
 */
const FONT_SIZES = ['14px', '20px', '24px']
const QUILL_CONFIG = [
  { style: 'style/size', whitelist: FONT_SIZES },
  'style/direction',
  'style/align',
]
QUILL_CONFIG.forEach(config => {
  let style = config.style || config
  let styleInstance = Quill.import('attributors/' + style)
  Quill.register(styleInstance, true)
  if (config.whitelist) {
    styleInstance.whitelist = config.whitelist
  }
})

/**
 * 编辑器的相关配置
 * @see(@url https://quilljs.com/docs/modules/toolbar/)
 */
const QUILL_MODULES = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'], // 粗体斜体一类的
      ['blockquote'],

      [{ header: 1 }, { header: 2 }],
      [{ size: [false, ...FONT_SIZES] }], // custom dropdown
      [{ list: 'ordered' }, { list: 'bullet' }],
      // [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }], // 右下角什么的

      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video'],
    ],
    handlers: {
      // @todo 调用image / video上传
      image() {
        let { quill } = this // 调用者是自身，this指向的是quill实例
        // 模拟input然后选择文件上传
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/jpeg,image/png')
        input.click()
        input.onchange = () => {
          const file = input.files[0]
          let form = new FormData()
          form.append('file', file) // 通过append向form对象添加数据
          form.append('name', 'poster')
          form.append('prefix', 'misc')
          // 上传图片 + 插入图片
          axios
            .post('/opapi/file/upload', form, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(res => res.data)
            .then(data => data.data)
            .then(url => {
              let range = quill.getSelection()
              quill.insertEmbed(range.index, 'image', url, Quill.sources.USER)
            })
            .catch(e => {
              console.error(e)
            })
        }
      },
    }
  }
}

export default {
  components: {
    quillEditor
  },
  props: {
    // 这个对象的配置系统，请直接参考文档
    item: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: false
    }
  },
  inject: {
    elForm: {
      default: '',
    },
    elFormItem: {
      default: '',
    }
  },
  data() {
    let value = this.form[this.item.key] || ''
    let richText = this.item.openRichText || value.startsWith('<p')
    return {
      richText,
      options: {
        theme: 'snow',
        placeholder: this.item.description || '请输入富文本',
        modules: QUILL_MODULES
      }
    }
  },
  computed: {
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : ''
    },
  },
  methods: {
    blurHandler() {
      this.dispatch('ElFormItem', 'el.form.blur', [this.value])
    },
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    }
  }
}
</script>

<style lang="less">
.success {
  .ql-toolbar {
    border-color: #67c23a;
  }

  .ql-container {
    border-color: #67c23a;
  }
}

.error {
  .ql-toolbar {
    border-color: #f56c6c;
  }

  .ql-container {
    border-color: #f56c6c;
  }
}

.ql-toolbar {
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  .ql-picker-label::before {
    position: relative;
    top: -4px;
  }
}

.ql-container {
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value]::before,
.ql-snow .ql-picker.ql-size .ql-picker-label.ql-active[data-value]::before {
  content: attr(data-value);
  // font-size: attr(data-value px);
}
</style>
