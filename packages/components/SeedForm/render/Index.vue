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
    const {
      value,
      seed,
      form,
      scope,
      isCustomerRender,
      $seedRender = {}
    } = this;
    const props = {
      value,
      seed,
      form,
      ...scope
    };
    const renderHub = $seedRender.form || {};

    // 自定义渲染器优先
    if (isCustomerRender) {
      return seed.render(h, props);
    }

    // 找得到的渲染器其次
    const renderName = `${seed.render}Render`;
    if (renderName in renderHub) {
      return h(renderHub[renderName], {
        props
      });
    }

    return h("ElInput", props);
  }
};
</script>
