<!-- @format -->

<template>
  <div class="block">
    <el-date-picker
      v-model="val"
      type="datetime"
      placeholder="选择日期时间"
      @change="timeChange"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    }
  },

  data() {
    return {
      val: this.value
    };
  },

  methods: {
    timeChange(e) {
      this.$emit("input", e);
    }
  }
};
</script>
