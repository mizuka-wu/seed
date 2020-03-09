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
    sidebarDepth: 2,
    sidebar: {
      "/guide/": ["", "SEED", "DSL"],
      "/components/": ["Form.html", "Table.html"]
    },
    nav: [
      {
        text: "学习",
        items: [
          {
            text: "文档",
            items: [
              { text: "起步", link: "/guide/index.html" },
              { text: "SEED配置", link: "/guide/SEED" },
              { text: "DSL说明", link: "/guide/DSL" }
            ]
          },
          {
            text: "组件",
            items: [
              { text: "Form", link: "/components/Form.html" },
              { text: "Table", link: "/components/Table.html" }
            ]
          }
        ]
      },
      {
        text: "贡献/提问",
        link: "https://github.com/mizuka-wu/Seed/issue"
      },
      { text: "Github", link: "https://github.com/mizuka-wu/Seed" }
    ],
    displayAllHeaders: true
  }
};
