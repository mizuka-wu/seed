<!-- @format -->

<template>
  <div class="block">
    <el-input v-model="val"></el-input>
    <div style="color: #999; font-size: 12px;" v-if="item.hint">
      {{ item.hint }}
    </div>
  </div>
</template>

<script>
/** @format */
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    value: {
      type: String
    }
  },

  data() {
    return {
      val: this.value
    };
  },
  watch: {
    val() {
      this.$emit("input", this.val);
    }
  }
};
</script>

<style>
/** @format */
</style>
