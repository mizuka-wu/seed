# 介绍

## Seed 是什么

`Seed` 是一个 **DSL** 库，通过事先定义好的**数据描述语言**来自动生成对应的后台管理页面，`Seed`本身只负责处理和解析**DSL**的部分，底层基于[vue](https://cn.vuejs.org/v2/guide/index.html)和[Element-UI](https://element.eleme.cn/#/zh-CN)提供能力进行页面的渲染以及提供通用组件。

如果想要使用 `Seed` ，就必须熟悉 `Seed` 自身所定义的 **数据描述语言（DSL）**，当然[Seed DSL](./DSL)在设计上力求简单和易于理解，日后也希望通过合理的**VSCODE 插件**和**NODE CLI**简单化操作

完成逻辑层的进一步抽象之后，也将提取一份**REACT**版本

## 起步

> seed-toolkit是一个从模版到组件的集合库，实现了从分析模型到生成整个页面的所有步骤  
> 底层的组件库目前采用了element-ui方案，安装Seed之前请先安装element-ui以及引入它😊

```bash
npm i --save seed-toolkit

# 或者

yarn add seed-toolkit
```

在入口`main.js`中注册Seed

```js
import Seed from "seed-toolkit";
Vue.use(Seed);
```

这样，Seed就被完全安装进来了，包括默认导出的`分页表格`模版，其采用的区块以及渲染相关的`component`

当然，通过你也可以通过`script`来引入，不过记得先引入`element-ui`

```html
<script src="https://cdn.jsdelivr.net/npm/seed-toolkit@1/dist/seed-toolkit.umd.min.js"></script>
```

### 一个最简单的例子

通过提供的`pagingTable`模版，只需要提供一个字段描述列表以及获取数据的方案即可

```vue
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

## Seed核心

`Seed`的核心就在于解析 [SEED DSL](./DSL)，然后生成对应的表格和表单，然后为了节约开发时间，将一些常用的功能和对应的表格/标单整合在了一起，生成了**区块** 最终，几个区块生成一个模版文件提供给用户，用户通过模版定义的几个方法

当然，后台管理页面，很多情况下，是对后台数据库的文件做`CRUD`的，那么我们还应该增加**添加记录**，**修改记录**等按钮，**筛选器**，**表单**等控件，这些怎么办呢，不要急，这就是**模版**的意义了，比如**修改按钮**，**添加按钮**，**删除按钮**等等，模版会根据传入的参数的不同，自动增加这一系列按钮，到视图内，不过如果还是有功能，显示等**自定义**的情况怎么办呢？

`Seed`内部使用了两种方案来实现自定义，如果你刚刚看过[SEED DSL](./DSL)的介绍就应该知道，`Seed`会根据`render`（相当于数据的**type**）的不同使用底层不同的渲染器进行渲染，不过如果想要自定义的话，也可以直接传入`jsx函数`或者`render`函数进行修改，不过这种情况下记得要根据模版的`block`切换渲染的位置

不过讲道理，用`render`函数不太符合使用`vue`的场景，所以`seed`同样支持使用`slot`去修改每个不同位置的显示逻辑，不过这里就得靠`block`进行分发`slot`了，具体可以看[SEED Slot](./SLOTS)的分发过程
