<!-- @format -->

<template>
  <el-select
    :disabled="item.disabled"
    v-model="form[item.key]"
    placeholder="请选择"
  >
    <el-option
      v-for="(option, index) in item.enum"
      :key="index"
      :label="'label' in option ? option.label : option"
      :value="'value' in option ? option.value : option"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    // 这个对象的配置系统，请直接参考文档
    item: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: false
    },
    rules: {
      type: Object,
      required: true
    }
  }
};
</script>
