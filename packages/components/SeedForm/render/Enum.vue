<template>
  <el-select v-model="data">
    <el-option
      :label="label"
      :value="value"
      :key="value"
      v-bind="optionProp"
      v-for="{ value, label, ...optionProp } of options"
    />
  </el-select>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    value: {
      required: true
    },
    seed: {
      type: Object,
      required: true
    }
  },
  computed: {
    options({ seed }) {
      const enumConfig = (seed.options || {}).enum;
      if (Array.isArray(enumConfig)) {
        return enumConfig.map(item => {
          if (typeof item === "object") {
            return item;
          } else {
            return {
              label: item,
              value: item
            };
          }
        });
      } else if (typeof enumConfig === "object") {
        return Object.entries(enumConfig).map(([value, label]) => ({
          value,
          label
        }));
      }
      return [];
    },
    data: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
