<!-- @format -->

<template>
  <el-radio-group
    :disabled="item.disabled"
    v-model="form[item.key]"
  >
    <el-radio
      :key="i"
      v-for="(item, i) in items"
      :label="item.value"
    >{{
      item.label
    }}</el-radio>
  </el-radio-group>
</template>

<script>
/** @format */

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
  },
  data() {
    return {
      checked: [],
      items: [],
    }
  },
  watch: {
    checked() {
      this.$emit('input', this.checked)
    },
  },
  /**
   * 自动更新type
   */
  mounted() {
    this.items = this.item.items
    if (!this.form[this.item.key]) {
      this.form[this.item.key] = this.item.defaultValue
    }
  },
  methods: {
    validate(value, callback) {
      if ((!value || value.length === 0) && this.rules.required) {
        callback(new Error('请至少选择一项'))
      } else {
        callback()
      }
    },
  },
}
</script>
