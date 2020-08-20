# 介绍

## Seed 是什么

`Seed` 是一个 **DSL** 库，通过事先定义好的**数据描述语言**来自动生成对应的后台管理页面，`Seed`本身只负责处理和解析**DSL**的部分，底层基于[vue](https://cn.vuejs.org/v2/guide/index.html)和[Element-UI](https://element.eleme.cn/#/zh-CN)提供能力进行页面的渲染以及提供通用组件。

如果想要使用 `Seed` ，就必须熟悉 `Seed` 自身所定义的 **数据描述语言（DSL）**，当然[Seed DSL](./DSL)在设计上力求简单和易于理解，日后也希望通过合理的**VSCODE 插件**和**NODE CLI**简单化操作

完成逻辑层的进一步抽象之后，也将提取一份**REACT**版本

## 起步

> seed-toolkit是一个从模版到组件的集合库，实现了从分析模型到生成整个页面的所有步骤  
> 底层的组件库目前采用了element-ui方案，安装Seed之前请先安装element-ui以及引入它😊

``` bash
npm i --save seed-toolkit
# 或者
yarn add seed-toolkit
```

在入口`main.js`中注册Seed

``` js
import Seed from "seed-toolkit";
Vue.use(Seed);
```

这样，Seed就被完全安装进来了，包括默认导出的`分页表格`模版，其采用的区块以及渲染相关的`component`

当然，通过你也可以通过`script`来引入，不过记得先引入`element-ui`

``` html
<script src="https://cdn.jsdelivr.net/npm/seed-toolkit@1/dist/seed-toolkit.umd.min.js"></script>
```

实际上 如果不使用模版系统的话，直接引入各个`Block`乃至直接使用`Component`都是可以的

### 一个最简单的例子

通过提供的`pagingTable`模版，只需要提供一个字段描述列表以及获取数据的方案即可

``` html
<template>
    <seed :seeds="seeds" :fetchList="fetchList" />
</template>
<script>
    export default {
        data() {
            return {
                seeds: [{ key: 'id' }, { key: 'status', type: 'enum' }]
            }
        },
        methods: {
            fetchList(params) {
                return axios.get('', { params })
            }
        }
    }
</script>
```

然后就能生成一个能够有基本`Search`条件修改，能分页的Table了

当然状态的**显示**和**筛选**项其实是跟着enum走的，这个可以点击例子的源码查看具体的写法，暂不展开

<SeedExample example="BaseExample" />

::: tip
对例子，可以进行**全屏**以及**查看源码**操作
:::

## 基本概念

`Seed`的核心就在于解析 [SEED DSL](./DSL)，然后生成对应的表格和表单，然后为了节约开发时间，将一些常用的功能和对应的表格/标单整合在了一起，生成了**区块** 最终，几个区块生成一个模版文件提供给用户，用户通过模版定义的几个方法

### 定义数据

后台页面说到底也就是对数据库的**增删改查**为主，要实现这个目的，就需要通过数据模型进行前后台的交互，所以才会有这个[SEED DSL](./DSL)

不过既然描述`JSON`可以用[json-schema](https://json-schema.org/)的情况下为何还要用一个自己的[SEED DSL](./DSL)呢？

还是为了**写起来方便**和**记忆起来简单** 毕竟真的很简单

- **key**: 字段名/自定义渲染的时候仅作为标识符
- **label**: 显示的中文名
- **render**: 类型/渲染方式
- **options**: 其他都扔在这里

::: tip
`key`其实是支持`xx.xx.xx`这种链式取值方法的，例如`a.b.c`就会取当前行`row.a.b.c`的数据作为返回值
:::

不过这也是个妥协的结果，这样的定义，无法满足**多层级嵌套**描述，好在多数情况下可以通过后端打平数据，以及通过链式调用来获取对应的值

::: warning
**不过**[Form](/seed/components/form)暂时没支持在更新数据的时候根据**链式**自动生成多个`object`，争取在之后版本补上这个功能
:::

### 如何生成一个页面

当然，后台管理页面，很多情况下，是对后台数据库的文件做`CRUD`的，那么我们还应该增加**添加记录**，**修改记录**等按钮，**筛选器**，**表单**等控件，这些怎么办呢，不要急，这就是**模版**的意义了，比如**修改按钮**，**添加按钮**，**删除按钮**等等，模版会根据传入的参数的不同，自动增加这一系列按钮，到视图内，不过如果还是有功能，显示等**自定义**的情况怎么办呢？

### 自定义显示策略

`Seed`内部使用了两种方案来实现自定义，如果你刚刚看过[SEED DSL](./DSL)的介绍就应该知道，`Seed`会根据`render`（相当于数据的**type**）的不同使用底层不同的渲染器进行渲染，不过如果想要自定义的话，也可以直接传入`jsx函数`或者`render`函数进行修改，不过这种情况下记得要根据模版的`block`切换渲染的位置

不过讲道理，用`render`函数不太符合使用`vue`的场景，所以`seed`同样支持使用`slot`去修改每个不同位置的显示逻辑，不过这里就得靠`block`进行分发`slot`了，具体可以看[SEED Slot](./SLOTS)的分发过程

## 项目分层

为了开发和理解起来顺利，`seed`目前拥有三层数据架构模型，分别是`模版`>`区块`>`组件`，内部其实组件也分了两个类别

### 组件

#### 容器组件

之前也提过，Seed的核心功能其实是解析自定义的[SEED DSL](./DSL)(在系统中称为`seeds`)，对传入的数据进行自动解析，取值，生成对应的[Table](/seed/components/Table)和[Form](/seed/components/Form), 同时提供各个地方的[插槽(scopedSlots)](./SLOTS)进行自定义

::: tip
[Table](/seed/components/Table)的插槽复杂一些，包括表头，表格四周一些位置，字段渲染各方各面
:::

#### 渲染组件

但是光生成[Table](/seed/components/Table)和[Form](/seed/components/Form)其实意义也不大，同时也需要根据每个字段的类型取选择不同的渲染方案，比如是个图片就在`表格`内显示图片，在`表单`内就变成图片上传，这一类的组件被挂载在`$seedRender`上，根据`render`属性进行自动匹配渲染，当然，做了一定的拖底处理，不用担心不显示的问题，同样的也支持[插槽(scopedSlots)](./SLOTS)进行自动替换，之所以会挂载在`$seedRender`上也是为了方便替换和扩展默认的渲染组件，但是这也就造成了，如果不是全局注册安装`Seed`的话，就要单独安装[renderHub](./RENDER_HUB)了

```js
import renderHub from 'seed-toolkit/packages/renderHub'

Vue.use(renderHub)
```

### 区块

区块相当于`react`的`HOC`通过操控`props`和`slots`对`组件`进行注入和扩展让组件拥有更多的功能  
例如：  
`Filter`区块在[Form](/seed/components/Form)的基础上，增加了外框以及`查询`和`重置`按钮，并且处理了相关的事件  

`Table`区块则添加了`表头吸附`，`控制列`，`删除`，`修改`对应的按钮和自动注入[Form](/seed/components/Form)等功能

最重要的是区块还承担了**分发slots**这种职责，这样也是为了提升日后复用以及实现可视化操作的可能性做的抽象准备

### 模版

`区块`的合集称为模版，模版预先定义好了各类的输入和对应的`区块`，同时也是页面开发的数据存储中心，单个页面的数据基本都存在模版之内

当前仅开放了[PagingTable](/seed/templates/PagingTable)模版

## 准备好了吗

基本的概念差不多理解了，接下来，就从使用[PagingTable](/seed/templates/PagingTable)模版开始做起，一步步跟随实例来掌握这个后台页面管理工具吧
