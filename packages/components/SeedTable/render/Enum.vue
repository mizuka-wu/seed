<!-- @format -->

<script>
/**
 * @param { import('types/seed').TableRenderContext } context
 */
function getValue({ props }) {
  const { seed, value } = props;
  const options = seed.options || {};
  const enumConfig = options.enum || {};
  console.log(enumConfig, value);
  if (Array.isArray(enumConfig)) {
    const target = enumConfig.find(
      enumItem => enumItem.value == value || enumItem == value
    );
    return target ? target.label || target : value;
  } else {
    return enumConfig[value];
  }
}
export default {
  render: function(h, context) {
    return h("div", getValue(context));
  },
  functional: true,
  props: ["value", "seed"]
};
</script>
