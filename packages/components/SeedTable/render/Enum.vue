<!-- @format -->

<script>
function getValue({ props, value }) {
  const { options = {} } = props;
  const enumConfig = options.enum || {};
  if (Array.isArray(enumConfig)) {
    const target = enumConfig.find(
      enumItem => enumItem.value === value || enumItem === value
    );
    return target ? target.label || target : value;
  } else {
    return enumConfig[value];
  }
}
export default {
  render: function(h, context) {
    console.log(context);
    return h("div", getValue(context));
  },
  functional: true,
  props: ["value", "seed"]
};
</script>
