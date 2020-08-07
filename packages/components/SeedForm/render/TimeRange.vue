<!-- @format -->

<template>
  <el-date-picker
    ref="picker"
    :value="value"
    @input="handleInput"
    size="mini"
    unlink-panels
    type="datetimerange"
    value-format="yyyy-MM-dd HH:mm:ss"
    range-separator="至"
    :picker-options="pickerOptions"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  ></el-date-picker>
</template>

<script>
/** @format */

import moment from "moment";
function today() {
  return moment().toDate();
}
/**
 * @returns {Date} - 今天的23:59:59秒
 */
function endOfToday() {
  return moment()
    .endOf("day")
    .toDate();
}

function startOfToday() {
  return moment()
    .startOf("day")
    .toDate();
}

export default {
  props: ["value", "item", "form", "options", "rules"],
  data() {
    const end = endOfToday();
    const start = startOfToday();
    const defaultValue = [start, end];
    return {
      defaultValue,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = today();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = today();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = today();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    handleInput(e) {
      let [start, end] = e;
      this.$emit("input", [new Date(start), new Date(end)]);
    },
    validate(value, callback) {
      if ((this.rules.required && !value) || !value.length) {
        callback(new Error("请选择时间范围"));
      } else {
        callback();
      }
    },
    updatePicker(value) {
      this.$nextTick(() => {
        let picker = this.$refs.picker;
        picker.emitInput(value || this.defaultValue);
      });
    }
  },
  watch: {
    /**
     * 补全初始化过程
     */
    value: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.updatePicker();
        }
      }
    },
    form() {
      let val = this.form[this.item.key];
      this.updatePicker(val);
    }
  },
  mounted() {
    let val = this.item.options.keys
      .map(key => {
        const v = this.form[key];
        return v ? new Date(v) : null;
      })
      .filter(v => v);
    if (val.length) {
      this.updatePicker(val);
    }
  }
};
</script>

<style></style>
