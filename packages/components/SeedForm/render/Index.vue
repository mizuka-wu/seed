<script>
export default {
  name: "FormRender",
  props: {
    seed: {
      type: Object,
      required: true
    },
    scope: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  computed: {
    isCustomerRender: ({ seed }) => typeof seed.render === "function",
    Tag({ isCustomerRender, seed }) {
      if (isCustomerRender) {
        return "div";
      }
      const render = seed.render + "Render";
      return render in components ? render : "ElInput";
    },
    value() {
      const { seed, form } = this;
      return form.get(seed.key);
    }
  },
  methods: {
    handerChange(value) {
      const {
        seed: { key },
        form
      } = this;

      this.$emit("update:form", form.set(key, value));
    }
  },
  render(h) {
    const { handerChange, value, Tag, isCustomerRender, form, seed } = this;
    return (
      <Tag value={value} onInput={handerChange}>
        {isCustomerRender &&
          seed.render(
            h,
            value,
            {
              handerChange,
              form
            },
            seed
          )}
      </Tag>
    );
  }
};
</script>
