<script>
import valueHelper from "seed-toolkit/lib/value";

/**
 * 一个默认的实现显示组件，包含对类型的判断以及相关修正
 * 现在还承担Excel的格式化工作
 */
export default {
  name: "ColumnRender",
  props: {
    // scope
    scope: {
      type: Object,
      required: true
    },
    seed: {
      type: Object
    }
  },
  computed: {
    value() {
      const { row } = this.scope;
      return valueHelper(row, this.seed);
    },
    isCustomerRender: ({ seed }) => typeof seed.render === "function"
  },
  render(h) {
    const { value, seed, scope, isCustomerRender, $seedRender = {} } = this;
    const props = {
      value,
      seed,
      model: scope.row,
      index: scope.$index,
      scope
    };

    const context = {
      props
    };

    const renderHub = $seedRender.table || {};

    // 自定义渲染器优先
    if (isCustomerRender) {
      return seed.render(h, context);
    }

    // 找得到的渲染器其次
    const renderName = `${seed.render}Render`;
    if (renderName in renderHub) {
      return h(renderHub[renderName], context);
    }

    return h("div", value);
  }
};
</script>
