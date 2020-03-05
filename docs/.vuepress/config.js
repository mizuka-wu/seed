module.exports = {
  title: "Seed",
  base: "/Seed/",
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/": {
      lang: "zh-CN", // 将会被设置为 <html> 的 lang 属性
      title: "Seed",
      description: "一个构建后台页面的快捷组件"
    },
    "/en/": {
      lang: "en-US",
      title: "Seed",
      description: "A component for building backend manage page"
    }
  },
  themeConfig: {
    sidebar: {
      "/guide/": ["", "SEED", "DSL"]
    },
    displayAllHeaders: true
  }
};
