<template>
  <el-dialog :visible.sync="visible" v-on="$listeners" destroy-on-close>
    <template slot="title">
      {{ isEdit ? "编辑" : "添加" }}
      <slot name="title" />
    </template>
    <SeedForm
      ref="form"
      :seeds="formSeeds"
      v-if="visible"
      :defaultForm="defaultForm"
      v-on="$listeners"
      v-bind="$attrs"
    />
    <template slot="footer">
      <el-button size="small" type="primary" @click="submit">提交</el-button>
      <el-button size="small">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import SeedForm from "#/components/SeedForm/Index";
import optionsHelper from "./lib/options";
export default {
  components: {
    SeedForm
  },
  name: "SeedFromContainer",
  props: {
    seeds: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      form: null,
      visible: false,
      defaultForm: null
    };
  },
  methods: {
    open(form = null) {
      this.defaultForm = form;
      this.isEdit = !!form;
      this.visible = true;
    },
    submit() {
      const form = this.$refs.form;
      form
        .validate()
        .then(validated => {
          if (validated) {
            this.$emit("submit", {
              form: form.model,
              isAdd: !this.isEdit
            });
            this.visible = false;
          }
        })
        .catch(e => {
          this.visible = false;
          // eslint-disable-next-line
          console.error(e);
        });
    }
  },
  computed: {
    /**
     * 根据类型动态调整
     */
    formSeeds() {
      const { seeds, isEdit } = this;
      const formSeeds = optionsHelper(seeds, "form");
      return optionsHelper(formSeeds, isEdit ? "update" : "add");
    }
  }
};
</script>
