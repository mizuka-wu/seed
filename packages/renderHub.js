/**
 * 自动注册render系统到Vue实例用
 */
function initHub() {
  return {
    table: {},
    form: {}
  };
}

export default {
  install(Vue) {
    const $seedRender = initHub();
    Vue.prototype.$seedRender = $seedRender;
  }
};
