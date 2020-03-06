<script>
const modules = require.context("./", false, /^\.\/(.*)\.vue$/);

const components = modules.keys().reduce((components, id) => {
  const renderName = `${/^\.\/(.*)\.vue$/.exec(id)[1]}Render`;
  if (renderName === "IndexRender") {
    return components;
  }
  components[renderName] = modules(id);
  return components;
}, {});

// import Schema from "async-validator";
// import ERROR_CN from "./error.cn.json";

export default {
  components,
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
  render() {
    return <ElInput />;
  }
};
</script>
