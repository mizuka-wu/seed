<template>
  <el-dialog :visible="visible" v-on="$listeners">
    <template slot="title">
      {{ isEdit ? "编辑" : "添加" }}
      <slot name="title" />
    </template>
    <SeedForm
      ref="form"
      :seeds="formSeeds"
      v-if="visible"
      v-on="$listeners"
      v-bind="$attrs"
    />
  </el-dialog>
</template>

<script>
import SeedForm from "./components/SeedForm/Index";
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
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isEdit: false,
      form: null
    };
  },
  methods: {
    open(form = null) {
      this.isEdit = !!form;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.form.defaultForm = form;
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
