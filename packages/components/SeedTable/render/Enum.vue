<!-- @format -->

<script>
function getValue() {
  // let props = context.props;
  // let enums = props.column.enum;
  // let data = props.data;
  // let target =
  //   (enums || []).find(item => item.value == data || item == data) || {};
  return 1;
  // return target.label || target;
}
export default {
  render: function(h, context) {
    return h("div", getValue(context));
  },
  functional: true,
  props: ["column", "data"]
};
</script>
