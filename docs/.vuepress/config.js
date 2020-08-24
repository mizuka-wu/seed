const path = require("path");
function resolve(dir) {
  return path.resolve(__dirname, '..', '..', dir);
}

// 顶栏
const nav = [
  {
    text: "文档",
    items: [
      { text: "起步", link: "/guide/index.html" },
      { text: "DSL说明", link: "/guide/DSL" },
    ],
  },
  {
    text: "组件",
    items: [
      { text: "Form", link: "/components/Form.html" },
      { text: "Table", link: "/components/Table.html" },
    ],
  },
]

module.exports = {
  title: "Seed",
  base: "/seed/",
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("examples"))
      .set("seed-toolkit/packages", resolve("packages"))
      .set("seed-toolkit/lib", resolve('lib'))
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/": {
      lang: "zh-CN", // 将会被设置为 <html> 的 lang 属性
      title: "Seed",
      description: "一个构建后台页面的快捷组件",
    },
    "/en/": {
      lang: "en-US",
      title: "Seed",
      description: "A component for building backend manage page",
    },
  },
  themeConfig: {
    nav: [
      {
        text: "学习",
        items: nav,
      },
      {
        text: "贡献/提问",
        link: "https://github.com/mizuka-wu/seed/issues",
      },
      { text: "Github", link: "https://github.com/mizuka-wu/seed" },
    ],
    sidebarDepth: 2,
    // 根据navbar自动生成
    sidebar: nav.reduce((sidebar, { items }) => ({
      ...sidebar,
      ...items.reduce((_sidebar, item) => {
        const { link } = item

        const { scope, name } = ((/(?<scope>\/.*?\/)(?<name>\w*)\.?.*/.exec(link) || {}).groups) || {}

        if (!(scope in _sidebar)) {
          _sidebar[scope] = []
        }

        _sidebar[scope].push(name === 'index' ? '' : name)

        return _sidebar
      }, {})
    }), {}),
    displayAllHeaders: true,
    repo: "mizuka-wu/seed",
    repoLabel: "查看源码",
    docsBranch: "gh-pages",
    editLinks: true,
    docsDir: "docs",
    editLinkText: "帮助我们改善此页面！",
  },
  plugins: [
    [
      "vuepress-plugin-mygitalk",
      {
        enable: true,
        home: true,
        // Gitalk配置
        gitalk: {
          clientID: "6629e6333b67beef1bbe",
          clientSecret: "a535790e6ce34573475404abe6dfbbe7b5c95b80",
          // GitHub repository. 存储评论的 repo
          repo: "mizuka-wu/seed",
          owner: "mizuka-wu",
          language: "zh-CN",
        },
      },
    ],
  ],
};
