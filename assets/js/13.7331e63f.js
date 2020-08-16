(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{522:function(t,e,_){"use strict";_.r(e);var v=_(0),s=Object(v.a)({},(function(){var t=this,e=t.$createElement,_=t._self._c||e;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"seed-容器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#seed-容器"}},[t._v("#")]),t._v(" Seed 容器")]),t._v(" "),_("h2",{attrs:{id:"seed-是如何组成的"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#seed-是如何组成的"}},[t._v("#")]),t._v(" Seed 是如何组成的")]),t._v(" "),_("p",[_("img",{attrs:{src:"/seed/design.png",alt:""}})]),t._v(" "),_("p",[_("code",[t._v("Seed")]),t._v("如图，入口由"),_("code",[t._v("PagingTable")]),t._v("进行控制，"),_("code",[t._v("PagingTable")]),t._v("会根据输入的参数，动态的调整内部的"),_("strong",[t._v("组件")]),t._v("是否显示，以及是否对应增加一系列的按钮")]),t._v(" "),_("p",[t._v("当然在控制叶脉呢之前，你可以先和后端把对应接口定义好，同时根据接口生成对应的 "),_("a",{attrs:{href:"./SEED"}},[t._v("SEED")]),t._v(" 然后再进行当前操作")]),t._v(" "),_("p",[t._v("顺带一题，后期也有计划试着根据"),_("code",[t._v("json-schema")]),t._v("和"),_("code",[t._v("yapi")]),t._v("直接生成，当然这是后话了")]),t._v(" "),_("h2",{attrs:{id:"控制相关显示"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#控制相关显示"}},[t._v("#")]),t._v(" 控制相关显示")]),t._v(" "),_("p",[t._v("其实说到底，大部分的操作就是对应着 "),_("strong",[_("a",{attrs:{href:"https://baike.baidu.com/item/crud/3606157?fr=aladdin",target:"_blank",rel:"noopener noreferrer"}},[t._v("CRUD"),_("OutboundLink")],1)]),t._v(" 操作而已，所以根据这个"),_("code",[t._v("Seed")]),t._v("的相关接口和命名也照着这个思路，通过区分"),_("strong",[t._v("List")]),t._v(", "),_("strong",[t._v("Item")]),t._v("来表明操作对象，当然，也有一些拓展的接口不按照这个命名方法，这个就另说了")]),t._v(" "),_("h3",{attrs:{id:"基本的行为控制参数"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#基本的行为控制参数"}},[t._v("#")]),t._v(" 基本的行为控制参数")]),t._v(" "),_("p",[t._v("以下是这些基础的控制参数，对于"),_("code",[t._v("Seed")]),t._v("来说，都应该是一个"),_("code",[t._v("function")])]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("fetchList")]),t._v(" 显示"),_("strong",[t._v("过滤")]),t._v(", "),_("strong",[t._v("分页")]),t._v(" 获取数据等操作")]),t._v(" "),_("li",[_("strong",[t._v("addItem")]),t._v(" 增加按钮")]),t._v(" "),_("li",[_("strong",[t._v("updateItem")]),t._v(" 更新按钮")]),t._v(" "),_("li",[_("strong",[t._v("deleteItem")]),t._v(" 删除按钮")])]),t._v(" "),_("h3",{attrs:{id:"拓展行为控制"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#拓展行为控制"}},[t._v("#")]),t._v(" 拓展行为控制")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("excel")]),t._v(" 支持导出为 excel")]),t._v(" "),_("li",[_("strong",[t._v("updateList")]),t._v(" 覆盖 excel 循环上传为改用此接口更新")])]),t._v(" "),_("h3",{attrs:{id:"slot-控制"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#slot-控制"}},[t._v("#")]),t._v(" Slot 控制")]),t._v(" "),_("p",[t._v("一部分需要"),_("code",[t._v("slot")]),t._v("才知道是否能够控制显示，主要还是设计上的问题，个人期望这块将之后的行为控制完全交给使用者")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("batchList")]),t._v(" 增加一个选择列，选择结果将回给这个 "),_("strong",[t._v("slot-scope")])])])])}),[],!1,null,null,null);e.default=s.exports}}]);