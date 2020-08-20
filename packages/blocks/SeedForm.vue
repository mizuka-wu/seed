<script>
import SeedForm from "seed-toolkit/packages/components/SeedForm/Index";
import optionsHelper from "seed-toolkit/lib/options";
import scopedSlotsHelper from "seed-toolkit/lib/scopedSlots";

export const FORM_SCOPE = "form";
export const UPDATE_FORM_SCOPE = "update";
export const ADD_FORM_SCOPE = "add";

export default {
  render() {
    const vm = this;
    const {
      $listeners,
      visible,
      formSeeds,
      defaultForm,
      isEdit,
      $slots,
      scopedSlots,
      submit,
      cancel
    } = this;
    return (
      <el-dialog
        visible={visible}
        on={{ ...$listeners, "update:visible": e => (vm.visible = e) }}
        destroy-on-close
      >
        <div slot="title">
          {isEdit ? "编辑" : "添加"}
          {$slots.title}
        </div>
        {visible && (
          <SeedForm
            ref="form"
            seeds={formSeeds}
            defaultForm={defaultForm}
            scopedSlots={scopedSlots}
            v-on="$listeners"
            v-bind="$attrs"
          />
        )}
        <template slot="footer">
          <el-button size="small" type="primary" onClick={submit}>
            提交
          </el-button>
          <el-button size="small" onClick={cancel}>
            取消
          </el-button>
        </template>
      </el-dialog>
    );
  },
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
  computed: {
    subFormType({ isEdit }) {
      return isEdit ? UPDATE_FORM_SCOPE : ADD_FORM_SCOPE;
    },
    scopedSlots({ $scopedSlots, subFormType }) {
      const formScopedSlots = scopedSlotsHelper($scopedSlots, FORM_SCOPE);
      const overWriteScopedSlots = scopedSlotsHelper($scopedSlots, subFormType);
      return {
        ...formScopedSlots,
        ...overWriteScopedSlots
      };
    },
    /**
     * 根据类型动态调整
     */
    formSeeds({ seeds, subFormType }) {
      const formSeeds = optionsHelper(seeds, FORM_SCOPE);
      return optionsHelper(formSeeds, subFormType);
    }
  },
  methods: {
    open(form = null) {
      this.defaultForm = form;
      this.isEdit = !!form;
      this.visible = true;
    },
    /**
     * @todo 增加校验
     */
    cancel() {
      this.visible = false;
      this.defaultForm = false;
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
  }
};
</script>
