---
home: true
heroImage: /logo.png
heroText: Seed组件
tagline: 一个构建后台页面的快捷组件
actionText: 快速上手 →
actionLink: /guide/
features:
  - title: 组件化
    details: 完全组件化，基本不强制以来某个cli进行生成页面，安装即用，渐进式配置
  - title: 高度自定义
    details: 提供 Slot 和 render 方法，最大自定义化每个部分的表现行为，当然直接引用某个部分自己拼装也没啥问题
  - title: 贴合业务
    details: 很多基础功能和布局，都是和业务直接对接商讨的，相信这些更加贴合实际使用人的场景吧
footer: MIT Licensed | Copyright © 2020-present Edward Wu
---

# Seed

> 茅场晶彦托付给桐人老爷的`世界的种子`可以说是所有`vrmmo`的基础，这里也希望`Seed`这个组件能够成为一个通用的，能够成为后台页面生成的种子，才不是中二病

![Seed](https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=46c9b88b75f08202399f996d2a929088/c8ea15ce36d3d5395d82536b3c87e950342ab0df.jpg)

Seed，脱胎于在票牛网工作时，为了方便老的`ng`后台页面迁移到新的`vue`框架而诞生的一个**vue 组件系统**，Seed 的设计理念就是，足够的轻量，引入一个组件就可以解决所有的问题，足够的简单，一套 DSL 就能生成 `form` + `table` + `filter`，足够的定制化，大量的 **[slot](https://cn.vuejs.org/v2/guide/components-slots.html)** 插槽能够自定义基本所有显示区域。

当然啦，Seed 也是有自身局限性的，诞生之初他就只是为了后台管理页面而生，脱离这个使用场景反而显得它很奇怪

市面上也有不少其他类似产品，比如`Duang+`，`iceworks`等等，但是无一例外，都是最好搭配`cli`使用的，Seed 认为使用的人均为前端或者经过简单前端培训就能上手的人，所以只提供**代码层面**的配置以及一个`Component`作为入口而已

顺带一提，Seed 对**Excel**的支持算是非常不错的了，支持表格全量导出为 Excel（做了点操作，异步导出，基本内存能存的下数据的话不会挂的），Excel 批量新建和更新等功能，日后也考虑支持和 Excel 直接进行交互（Excel 插件形式）。

::: warning
`Element-UI >= 2.4.5`

`Vue >= 2.6.2`
:::
