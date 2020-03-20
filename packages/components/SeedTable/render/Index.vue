<script>
import valueHelper from "../../../lib/value";
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
    // 行得配置
    column: {
      type: Object
    }
  },
  computed: {
    value() {
      const { row } = this.scope;
      return valueHelper(row, this.column);
    },
    isCustomerRender: ({ column }) => typeof column.render === "function",
    Tag({ isCustomerRender, column }) {
      if (isCustomerRender) {
        return "div";
      }
      const render = column.render + "Render";
      return render in components ? render : "div";
    }
  },
  render(h) {
    const { value, Tag, column, scope, isCustomerRender } = this;
    if (isCustomerRender) {
      return column.render(h, value, column, scope);
    }
    return (
      <Tag value={value} data={value} column={column}>
        {value}
      </Tag>
    );
  }
};
</script>
