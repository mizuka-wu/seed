<!-- @format -->

<template>
  <div style="display: inline-block;">
    <component
      :is="item.empty"
      :item="item"
      :form="form"
      @change="onItemsChange($event)"
    ></component>
    <template v-if="items.length < 20">
      <el-checkbox
        v-if="items.length"
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        >全选</el-checkbox
      >
      <el-checkbox-group style="display: inline-block;" v-model="checked">
        <el-checkbox
          :key="item.value"
          v-for="item in items"
          :label="item.value"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
    </template>
    <template v-else>
      <el-select
        style="width: 500px;"
        v-model="checked"
        multiple
        placeholder="请选择"
      >
        <el-option
          v-for="item in items"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </template>
  </div>
</template>

<script>
/** @format */

export default {
  props: {
    // 这个对象的配置系统，请直接参考文档
    item: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    form: {
      type: Object,
      required: false
    },
    rules: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checked: this.value,
      items: []
    };
  },
  computed: {
    isIndeterminate() {
      return this.checked.length > 0 && this.checked.length < this.items.length;
    },
    checkAll: {
      get() {
        return (
          this.checked.length === this.items.length && this.checked.length > 0
        );
      },
      set(value) {
        if (value) {
          this.$set(
            this,
            "checked",
            this.items.map(item => item.value)
          );
        } else {
          this.checked.splice(0);
        }
      }
    }
  },
  watch: {
    checked() {
      const filtered = this.checked.filter(v => {
        return this.items.map(item => item.value).includes(v);
      });
      console.log("filtered", filtered);
      this.$emit("input", filtered);
    },
    items() {
      console.log("this.items change", this.items);
    }
  },
  /**
   * 自动更新type
   */
  created() {
    this.items = (this.item && this.item.items) || [];
    console.log("checked", this.checked, this.items);
    // this.checked = this.items.filter(v => {
    //   return this.items.includes(v)
    // })
  },
  methods: {
    onItemsChange(items) {
      this.items = items;
    },
    validate(value, callback) {
      console.log("rules", this.rules, value, this.items);
      if ((!value || value.length === 0) && this.rules.required) {
        callback(new Error("请至少选择一项"));
      } else {
        callback();
      }
    }
  }
};
</script>
