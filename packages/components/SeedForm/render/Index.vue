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
    slots: {
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
    value() {
      const { seed, form } = this;
      return form.get(seed.key);
    }
  },
  methods: {
    handleChange(value, _key) {
      const {
        seed: { key },
        form
      } = this;

      this.$emit("update:form", form.set(_key || key, value));
    }
  },
  render(h) {
    const {
      value,
      seed,
      scope,
      slots,
      isCustomerRender,
      handleChange,
      $seedRender = {}
    } = this;
    const props = {
      value,
      disabled: seed.options && seed.options.disabled,
      seed: {
        ...seed,
        options: seed.options || {}
      },
      ...scope
    };

    const context = {
      props,
      on: {
        input: handleChange.bind(this)
      }
    };

    const slotRender = slots[`${seed.key}Render`];
    if (slotRender) {
      return slotRender({ ...context.props, onInput: context.on.input });
    }

    const renderHub = $seedRender.form || {};

    // 自定义渲染器优先
    if (isCustomerRender) {
      return <div>{seed.render(h, context)}</div>;
    }

    // 找得到的渲染器其次
    const renderName = `${seed.render}Render`;
    if (renderName in renderHub) {
      return h(renderHub[renderName], context);
    }

    return h("ElInput", context);
  }
};
</script>
