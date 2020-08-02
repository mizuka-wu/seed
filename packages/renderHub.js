/**
 * 自动注册render系统到Vue实例用
 */
const renderComponents = require.context(
  "./components",
  true,
  /render\/(.*)\.vue$/
);

// 自动注册所有组件
const renderHub = renderComponents
  .keys()
  .filter(id => !id.includes("Index.vue"))
  .reduce(
    (hub, id) => {
      const { type = "", name = "" } =
        (id.match(/\.\/Seed(?<type>.*)\/render\/(?<name>.*)\.vue$/) || {})
          .groups || {};
      {
        (hub[type.toLowerCase()] || {})[
          `${name.toLowerCase()}Render`
        ] = renderComponents(id).default;
      }

      return hub;
    },
    {
      form: {},
      table: {}
    }
  );

export default {
  install(Vue) {
    const $seedRender = renderHub;
    Vue.prototype.$seedRender = $seedRender;
  }
};
