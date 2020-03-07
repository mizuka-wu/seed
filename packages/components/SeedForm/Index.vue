<template>
  <el-form :model="form" :inline="inline" :rules="rules" v-if="form">
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
  },
  computed: {
    rules() {
      return this.seeds.reduce((rules, seed) => {
        const { key, label, options = {} } = seed;
        const customerRules = options.rules;
        let _rules = [
          options.required
            ? {
                required: true,
                message: `${label || key}字段 必填！`
              }
            : null
        ];

        if (Array.isArray(customerRules)) {
          _rules = [..._rules, ...customerRules];
        } else {
          _rules = [..._rules, customerRules];
        }

        rules[key] = _rules.filter(item => !!item);
        return rules;
      }, {});
    }
  }
};
</script>
