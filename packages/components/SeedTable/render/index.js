const modules = require.context("./", false, /^\.\/(.*)\.vue$/);

export default modules.keys().reduce((components, id) => {
  const renderName = `${/^\.\/(.*)\.vue$/.exec(id)[1]}Render`;
  components[renderName] = modules(id);
  return components;
}, {});
