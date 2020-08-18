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

/**
 * 默认的处理上传方案，建议替换
 * @see @url https://github.com/ElemeFE/element/issues/9759
 * @param { import('./node_modules/element-ui/types/upload').HttpRequestOptions } options
 * @returns { Promise<string> }
 */
export function defaultUpload({ file, onSuccess, onError }) {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = e => reject(e);
    fileReader.readAsDataURL(file);
  })
    .then(url => {
      onSuccess({
        data: url
      });
      return url;
    })
    .catch(e => onError(e));
}

export default {
  install(Vue, options = {}) {
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
        // eslint-disable-next-line
        console.warn(type, "默认渲染器将被覆盖");
      }

      // 注入
      $seedRender[renderType] = render.default || render;
    };

    $seedRender.registeRender = registeRender;

    if (options.fileUploader) {
      // eslint-disable-next-line
      console.info(
        "fileUploader请务必参照相关issue实现onSuccess",
        "https://github.com/ElemeFE/element/issues/9759"
      );
    }
    $seedRender.fileUploader = options.fileUploader || defaultUpload;

    Vue.prototype.$seedRender = $seedRender;
  }
};
