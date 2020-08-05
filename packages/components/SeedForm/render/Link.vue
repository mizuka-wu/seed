<!-- @format -->

<template lang="pug">
  .link-generater
    .new
      el-select.link-type(v-model="link",  value-key="name", placeholder="请选择", size="small", @change="change")
        el-option(v-for="opt in item.options", :key="opt.name", :label="opt.name", :value="opt") {{opt.name}}
      .params
        .params-wrapper(v-if="link && link.params", label-position="right")
          .param-item(v-for="param in link.params.concat('channel')", :label="param", :key="param")
            .el-form-item__label {{param}}
            el-input(v-model='linkParams[param]', @change='update')
    .origin(v-show='originValue')
      label 当前链接：
      el-input(disabled, :value='originValue')
</template>

<script>
/** @format */

import qs from '@/mods/qs'
import env from '@/mods/env'
import { setTimeout } from 'timers'

const platformKeys = ['schema', 'uri', 'pc', 'mplink']

export default {
  props: {
    // 这个对象的配置系统，请直接参考文档
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
    value: {
      required: true,
    },
  },
  data() {
    return {
      platform: 1,
      originValue: '',
      linkParams: {},
      link: null,
    }
  },
  watch: {
    value() {
      // Link组件比较特殊，自己的值在外展示是string形式
      // 修改后待处理的又是一个object
      // 这里不希望表单关闭后的更新还会影响实际的值
      // 故而做一个延时，当表单关闭后，getBoundingClientRect就会取到0
      setTimeout(() => {
        let bound = this.$el.getBoundingClientRect()
        if (typeof this.value === 'string' && this.value && bound.x != 0) {
          this.initValue()
        }
      })
    },
  },
  mounted() {
    this.initValue()
  },
  methods: {
    initValue() {
      const platformKey = 'platform'
      let platform = this.form[platformKey]
      let key = platformKeys[platform - 1]
      if (typeof this.value === 'string' && key) {
        this.originValue = this.value
        this.$emit('input', {
          [key]: this.value,
        })
      }
    },
    change() {
      this.linkParams = {}
      this.update()
    },
    replaceHost(url) {
      if (!env.isProduction()) {
        return url.replace('https://m.piaoniu.com', 'http://m.beta.piaoniu.com')
      }
      return url
    },
    update() {
      const link = Object.assign({}, this.link)
      const params = this.linkParams
      const neededParams = this.link.params || []
      this.originValue = ''
      for (let key in link) {
        if (platformKeys.indexOf(key) === -1) continue
        neededParams.forEach(p => {
          const segments = link[key].split('?')
          const parts = []
          segments.forEach((seg, i) => {
            let v = params[p]
            if (!v) {
              return
            }
            if (i === 1) {
              v = encodeURIComponent(v)
            }
            parts.push(seg.replace('{' + p + '}', v))
          })
          link[key] = parts.join('?')
        })
        link[key] = this.replaceHost(link[key])
        link[key] = qs.append(link[key], {
          channel: params.channel,
        })
      }
      this.$emit('input', link)
    },
    _allValueEmpty() {
      const val = this.value
      if (typeof val !== 'object') {
        return false
      }
      let allEmpty = platformKeys.every(k => !val[k])
      return allEmpty
    },
    validate(value, callback) {
      setTimeout(() => {
        // 点击事件触发validate会早于blur，所以这里异步一下
        if (this.rules.required && (!value || this._allValueEmpty())) {
          callback(new Error('请填写url'))
        } else {
          callback()
        }
      }, 0)
    },
  },
}
</script>

<style lang="less">
/** @format */

.link-generater {
  .origin {
    display: flex;
    label {
      margin-right: 10px;
      width: 100px;
    }
  }
  .new {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: top;
    .link-type {
      flex: 2;
      margin-right: 10px;
    }
    .params {
      flex: 3;
      .param-item {
        display: flex;
        .el-form-item__label {
          width: 80px;
          text-align: right;
          margin-right: 10px;
        }
        .el-input {
          width: 150px;
        }
      }
    }
  }
}
</style>
