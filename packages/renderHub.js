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
    const $seedRender = {
      ...renderHub
    };

    const registeRender = (registerOptions = {}) => {
      const { renderType, type, render } = registerOptions;

      // 如果按照form， table命名，则自动再调用自身
      const autoRegisters = [
        { name: "form", value: registerOptions.form },
        { name: "table", value: registerOptions.table }
      ].filter(register => register.value);
      if (autoRegisters.length > 0) {
        autoRegisters.forEach(register => {
          registeRender({
            renderType: register.name,
            type,
            render: register.value
          });
        });
        return;
      }

      /**
       * 检测是否合法
       */
      if (!renderType || !(renderType in $seedRender)) {
        throw new Error("无法注册该渲染器，请检查指定为table/form类型");
      }

      if (!type) {
        throw new Error("请填写类型名称");
      }

      if (!render) {
        throw new Error("请检查是否传入渲染方法");
      }

      const renderName = `${type.toLowerCase()}Render`;

      // warning
      if (renderName in $seedRender[renderType]) {
        console.warn(type, "默认渲染器将被覆盖");
      }

      // 注入
      $seedRender[renderType] = render.default || render;
    };

    $seedRender.registeRender = registeRender;

    Vue.prototype.$seedRender = $seedRender;
  }
};
