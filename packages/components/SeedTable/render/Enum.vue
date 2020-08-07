<!-- @format -->

<script>
function getValue(context) {
  let props = context.props;
  let enums = props.column.enum;
  let data = props.data;
  let target =
    (enums || []).find(item => item.value == data || item == data) || {};
  return target.label || target;
}
export default {
  excelRenderer(column, data) {
    let context = {
      props: {
        column,
        data
      }
    };
    return getValue(context);
  },
  render: function(h, context) {
    return h("div", getValue(context));
  },
  functional: true,
  props: ["column", "data"]
};
</script>
