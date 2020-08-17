import renderHub from "./renderHub";
const templates = require.context("./templates", false, /\.vue$/);

const defaultComponent = "pagingTable";

function upperFirstCharacter(targetString = "") {
  return targetString.charAt(0).toUpperCase() + targetString.slice(1);
}

export default {
  install(Vue, options) {
    // 注册renderHub
    Vue.use(renderHub, options);
    templates.keys().forEach(compoentPath => {
      const componentName = compoentPath.replace(/\.\/(.*)\.vue$/, "$1");
      const component = templates(compoentPath).default;
      Vue.component(`Seed${upperFirstCharacter(componentName)}`, component);
      if (componentName === defaultComponent) {
        Vue.component("Seed", component);
      }
    });
  }
};
