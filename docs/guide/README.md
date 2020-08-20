# 介绍

## Seed 是什么

`Seed` 是一个 **DSL** 库，通过事先定义好的**数据描述语言**来自动生成对应的后台管理页面，`Seed`本身只负责处理和解析**DSL**的部分，底层基于[vue](https://cn.vuejs.org/v2/guide/index.html)和[Element-UI](https://element.eleme.cn/#/zh-CN)提供能力进行页面的渲染以及提供通用组件。

如果想要使用 `Seed` ，就必须熟悉 `Seed` 自身所定义的 **数据描述语言（DSL）**，当然[Seed DSL](./DSL)在设计上力求简单和易于理解，日后也希望通过合理的**VSCODE 插件**和**NODE CLI**简单化操作

完成逻辑层的进一步抽象之后，也将提取一份**REACT**版本

## 起步

> `seed-toolkit`依赖于`element-ui`请先安装`element-ui`

```bash
npm i --save seed-toolkit

# 或者

yarn add seed-toolkit
```

在你的`main.js`中

```js
import Seed from "seed-toolkit";
Vue.use(Seed);

```

### 以下是一个简单的例子

<SeedExample example="BaseExample" />

就可以生成一个表格了

## Seed 只是这样么

`Seed`最基本的作用就是解析 [SEED DSL](./DSL)，刚刚所看到的表格仅仅只是`Seed组件`中的`Seed Table`所展现出来的处理结果

整个`Seed`的实际作用是生成一个后台管理页面，那么仅仅只具有一个表格怎么行，仅仅一个表格是无法做到`CRUD`的，那么我们还应该增加**添加记录**，**修改记录**等按钮，**筛选器**，**表单**等控件，这些怎么办呢，不要急，`Seed`通过传入的参数的不同，会自动判断和生成对应的控件和页面

接下来，请参考`Seed`的相关[介绍](./SEED), 学习如何生成一个带分页和查询提交的页面
