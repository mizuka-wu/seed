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
import moment from 'moment'

export default {
  props: {
    value: {
      type: Number
    }
  },

  data() {
    return {
      val: this.value
    }
  },

  methods: {
    timeChange(e) {
      // console.log(moment(e).valueOf());
      // this.val = moment(e).valueOf()
      this.$emit('input', moment(e).valueOf())
    }
  }
}
</script>
