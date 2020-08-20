(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{521:function(e,t,s){"use strict";s.r(t);var a=s(0),v=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[e._v("#")]),e._v(" 介绍")]),e._v(" "),s("h2",{attrs:{id:"seed-是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#seed-是什么"}},[e._v("#")]),e._v(" Seed 是什么")]),e._v(" "),s("p",[s("code",[e._v("Seed")]),e._v(" 是一个 "),s("strong",[e._v("DSL")]),e._v(" 库，通过事先定义好的"),s("strong",[e._v("数据描述语言")]),e._v("来自动生成对应的后台管理页面，"),s("code",[e._v("Seed")]),e._v("本身只负责处理和解析"),s("strong",[e._v("DSL")]),e._v("的部分，底层基于"),s("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue"),s("OutboundLink")],1),e._v("和"),s("a",{attrs:{href:"https://element.eleme.cn/#/zh-CN",target:"_blank",rel:"noopener noreferrer"}},[e._v("Element-UI"),s("OutboundLink")],1),e._v("提供能力进行页面的渲染以及提供通用组件。")]),e._v(" "),s("p",[e._v("如果想要使用 "),s("code",[e._v("Seed")]),e._v(" ，就必须熟悉 "),s("code",[e._v("Seed")]),e._v(" 自身所定义的 "),s("strong",[e._v("数据描述语言（DSL）")]),e._v("，当然"),s("a",{attrs:{href:"./DSL"}},[e._v("Seed DSL")]),e._v("在设计上力求简单和易于理解，日后也希望通过合理的"),s("strong",[e._v("VSCODE 插件")]),e._v("和"),s("strong",[e._v("NODE CLI")]),e._v("简单化操作")]),e._v(" "),s("p",[e._v("完成逻辑层的进一步抽象之后，也将提取一份"),s("strong",[e._v("REACT")]),e._v("版本")]),e._v(" "),s("h2",{attrs:{id:"起步"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#起步"}},[e._v("#")]),e._v(" 起步")]),e._v(" "),s("blockquote",[s("p",[s("code",[e._v("seed-toolkit")]),e._v("依赖于"),s("code",[e._v("element-ui")]),e._v("请先安装"),s("code",[e._v("element-ui")])])]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" i --save seed-toolkit\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 或者")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("yarn")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" seed-toolkit\n")])])]),s("p",[e._v("在你的"),s("code",[e._v("main.js")]),e._v("中")]),e._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("import")]),e._v(" Seed "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("from")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"seed-toolkit"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\nVue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("use")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("Seed"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n\n")])])]),s("h3",{attrs:{id:"以下是一个简单的例子"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#以下是一个简单的例子"}},[e._v("#")]),e._v(" 以下是一个简单的例子")]),e._v(" "),s("SeedExample",{attrs:{example:"BaseExample"}}),e._v(" "),s("p",[e._v("就可以生成一个表格了")]),e._v(" "),s("h2",{attrs:{id:"seed-只是这样么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#seed-只是这样么"}},[e._v("#")]),e._v(" Seed 只是这样么")]),e._v(" "),s("p",[s("code",[e._v("Seed")]),e._v("最基本的作用就是解析 "),s("a",{attrs:{href:"./DSL"}},[e._v("SEED DSL")]),e._v("，刚刚所看到的表格仅仅只是"),s("code",[e._v("Seed组件")]),e._v("中的"),s("code",[e._v("Seed Table")]),e._v("所展现出来的处理结果")]),e._v(" "),s("p",[e._v("整个"),s("code",[e._v("Seed")]),e._v("的实际作用是生成一个后台管理页面，那么仅仅只具有一个表格怎么行，仅仅一个表格是无法做到"),s("code",[e._v("CRUD")]),e._v("的，那么我们还应该增加"),s("strong",[e._v("添加记录")]),e._v("，"),s("strong",[e._v("修改记录")]),e._v("等按钮，"),s("strong",[e._v("筛选器")]),e._v("，"),s("strong",[e._v("表单")]),e._v("等控件，这些怎么办呢，不要急，"),s("code",[e._v("Seed")]),e._v("通过传入的参数的不同，会自动判断和生成对应的控件和页面")]),e._v(" "),s("p",[e._v("接下来，请参考"),s("code",[e._v("Seed")]),e._v("的相关"),s("a",{attrs:{href:"./SEED"}},[e._v("介绍")]),e._v(", 学习如何生成一个带分页和查询提交的页面")])],1)}),[],!1,null,null,null);t.default=v.exports}}]);