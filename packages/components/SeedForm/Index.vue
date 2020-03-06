<template>
  <el-form :model="form" :inline="inline" v-if="form">
    <el-form-item
      :key="formItem.key"
      v-for="(formItem, index) of seeds"
      :label="formItem.label || formItem.key"
    >
      <Render
        :seed="formItem"
        :scope="{ row: form, column: null, $index: index }"
        :form.sync="form"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import Render from "./render/Index.vue";

export default {
  components: {
    Render
  },
  props: {
    seeds: {
      type: Array
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultForm: null,
      form: {}
    };
  }
};
</script>
