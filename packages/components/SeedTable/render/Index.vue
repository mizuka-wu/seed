<script>
import valueHelper from "#/lib/value";
const modules = require.context("./", false, /^\.\/(.*)\.vue$/);

const components = modules.keys().reduce((components, id) => {
  const renderName = `${/^\.\/(.*)\.vue$/.exec(id)[1]}Render`;
  if (renderName === "indexRender") {
    return components;
  }
  components[renderName] = modules(id);
  return components;
}, {});

/**
 * 一个默认的实现显示组件，包含对类型的判断以及相关修正
 * 现在还承担Excel的格式化工作
 */
export default {
  components,
  name: "ColumnRender",
  props: {
    // scope
    scope: {
      type: Object,
      required: true
    },
    //
    seed: {
      type: Object
    }
  },
  computed: {
    value() {
      const { row } = this.scope;
      return valueHelper(row, this.seed);
    },
    isCustomerRender: ({ seed }) => typeof seed.render === "function",
    Tag({ isCustomerRender, seed }) {
      if (isCustomerRender) {
        return "div";
      }
      const render = seed.render + "Render";
      return render in components ? render : "div";
    }
  },
  render(h) {
    const { value, Tag, seed, scope, isCustomerRender } = this;
    return (
      <Tag value={value} data={value} seed={seed}>
        {isCustomerRender ? seed.render(h, value, scope, seed) : value}
      </Tag>
    );
  }
};
</script>
