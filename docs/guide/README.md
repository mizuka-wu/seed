# 介绍

## Seed 是什么

`Seed` 是一个 **DSL** 库，通过事先定义好的**数据描述语言**来自动生成对应的后台管理页面，`Seed`本身只负责处理和解析**DSL**的部分，底层基于[vue](https://cn.vuejs.org/v2/guide/index.html)和[Element-UI](https://element.eleme.cn/#/zh-CN)提供能力进行页面的渲染以及提供通用组件。

如果想要使用 `Seed` ，就必须熟悉 `Seed` 自身所定义的 **数据描述语言（DSL）**，当然[Seed DSL](./DSL.md)在设计上力求简单和易于理解，日后也希望通过合理的**VSCODE 插件**和**NODE CLI**简单化操作

完成逻辑层的进一步抽象之后，也将提取一份**REACT**版本

## 起步

> 目前处于开发阶段，实际上会不断的进行修改

请直接拷贝`packages`下的所有文件，引入`SeedContainer.vue`即可

给你的文件加入以下两个选项即可

### 代码

```vue
<template>
  <Seed :fetch-list="fetchList" :seeds="seeds" />
</template>
<script>
export default {
  data() {
    return {
      seeds: [{ key: "a", title: "标题" }]
    };
  },
  methods: {
    fetchList(params) {
      return {
        total: 1,
        data: [{ a: 1 }]
      };
    }
  }
};
</script>
```

### 实际效果

<Seed isShowFetchList />
