(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{440:function(t,s,a){"use strict";a.r(s);var n=a(4),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"dsl-语法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dsl-语法"}},[t._v("#")]),t._v(" DSL 语法")]),t._v(" "),a("h2",{attrs:{id:"基本语法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本语法"}},[t._v("#")]),t._v(" 基本语法")]),t._v(" "),a("p",[a("strong",[t._v("DSL")]),t._v(" 主要还是通过"),a("code",[t._v("javascript")]),t._v("对象的形式表现，同时为了保证顺序性，通过数组的方式来保存顺序，每个 "),a("code",[t._v("seed")]),t._v(" 对象都决定了在"),a("code",[t._v("form")]),t._v("和"),a("code",[t._v("table")]),t._v("中每一个字段的渲染方式，简单来说，每个"),a("code",[t._v("seed")]),t._v("对象都具有以下几个属性")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("key")]),t._v(" 获取传入对象的哪个"),a("code",[t._v("key")]),t._v("作为数据，支持"),a("code",[t._v("a.b.c")]),t._v("这类的链式调用")]),t._v(" "),a("li",[a("strong",[t._v("label")]),t._v(" 显示的名字，"),a("code",[t._v("table")]),t._v("中作为表头，"),a("code",[t._v("form")]),t._v("中作为"),a("strong",[t._v("label")])]),t._v(" "),a("li",[a("strong",[t._v("render")]),t._v(" 渲染方案，支持传入函数")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("键")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("key")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v("获取传入对象的哪个"),a("code",[t._v("key")]),t._v("作为数据，支持"),a("code",[t._v("a.b.c")]),t._v("这类的链式调用")])]),t._v(" "),a("tr",[a("td",[t._v("label")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v("显示的名字，"),a("code",[t._v("table")]),t._v("中作为表头，"),a("code",[t._v("form")]),t._v("中作为"),a("strong",[t._v("label")])])]),t._v(" "),a("tr",[a("td",[t._v("render")]),t._v(" "),a("td",[t._v("null/string/(value, options, slotScope) => JSX")]),t._v(" "),a("td",[t._v("渲染方案，支持传入函数")])]),t._v(" "),a("tr",[a("td",[t._v("show")]),t._v(" "),a("td",[t._v("null/boolean")]),t._v(" "),a("td",[t._v("是否渲染，默认为 true")])]),t._v(" "),a("tr",[a("td",[t._v("options")]),t._v(" "),a("td",[t._v("null/object")]),t._v(" "),a("td",[t._v("剩余的参数都在这")])])])]),t._v(" "),a("h2",{attrs:{id:"不同的组件渲染方案不一样？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#不同的组件渲染方案不一样？"}},[t._v("#")]),t._v(" 不同的组件渲染方案不一样？")]),t._v(" "),a("p",[t._v("通过在"),a("code",[t._v("options")]),t._v("中定义"),a("code",[t._v("form")]),t._v(", "),a("code",[t._v("filter")]),t._v(", "),a("code",[t._v("table")]),t._v("这三个属性，该属性下面的对象将会被合并到相应的"),a("code",[t._v("seed")]),t._v("对象上，这样就能完成合并啦")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    key"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    render"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'string'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    options"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        form"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            render"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'number'")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("将在"),a("code",[t._v("form")]),t._v("内被处理成")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    key"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    render"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'number'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    options"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"特殊情况"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特殊情况"}},[t._v("#")]),t._v(" 特殊情况")]),t._v(" "),a("p",[t._v("考虑到"),a("code",[t._v("form")]),t._v("表单也可能在"),a("code",[t._v("update")]),t._v("和"),a("code",[t._v("add")]),t._v("的时候不同，"),a("code",[t._v("form")]),t._v("下的"),a("code",[t._v("options")]),t._v("内还支持"),a("code",[t._v("add")]),t._v("和"),a("code",[t._v("update")]),t._v("这两种合并方式，具体来说，"),a("code",[t._v("seed")]),t._v(" 的多级合并可能复杂到")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    key"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    render"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'number'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    options"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        form"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            options"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                add"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                update"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        filter"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        table"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"最重要的几点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#最重要的几点"}},[t._v("#")]),t._v(" 最重要的几点")]),t._v(" "),a("ul",[a("li",[t._v("和"),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("vue"),a("OutboundLink")],1),t._v("等前端框架一样，"),a("code",[t._v("key")]),t._v("这个属性绝对不能重复")]),t._v(" "),a("li",[a("code",[t._v("render")]),t._v("的影响是全局的，如果定义的话，请分别给"),a("code",[t._v("form")]),t._v(", "),a("code",[t._v("table")]),t._v("等地方分开定义，"),a("strong",[t._v("起码"),a("code",[t._v("table")]),t._v("需要分开定义！")]),t._v("，否则"),a("code",[t._v("form")]),t._v("中出现纯文本？")])])])}),[],!1,null,null,null);s.default=e.exports}}]);