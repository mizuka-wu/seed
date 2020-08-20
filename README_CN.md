# Seed

![upload release asset](https://github.com/mizuka-wu/Seed/workflows/upload%20release%20asset/badge.svg)
![publish to npm](https://github.com/mizuka-wu/Seed/workflows/publish%20to%20npm/badge.svg)
One step generating pages from data define!
![Publish docs to github actions](https://github.com/mizuka-wu/Seed/workflows/Publish%20docs%20to%20github%20actions/badge.svg)

[中文](https://github.com/mizuka-wu/seed/blob/master/README_CN.md)

## 开始

这个项目尝试简化后台页面的开发流程，通过提供`模版`和`区块`还有`一些通用组件`的方式，让您在仅需要提供一个`数据模型`定义的基础上，生成页面的`table`和`form`

seed-toolkit 通过提供一个简单的 [DSL](https://www.mizuka.top/seed/guide/DSL.html) 定义方案，用来描述页面使用的数据模型（request/response）

同时提供一系列的`预置`的模版方便快速页面生成

（当前仅提供分页筛选表格）

![preview](https://cdn.jsdelivr.net/gh/mizuka-wu/seed@master/docs/.vuepress/public/preview.png)

### 安装

```bash
npm i seed-toolkit

## or

yarn add seed-toolkit

```

### 文档

- [中文文档](https://www.mizuka.top/seed/)

### 需求

`Element-UI >= 2.4.5`

`Vue >= 2.5.0`

## 开发

fork本项目

开发页面在`examples`下

具体`component`代码在`packages`下，根据命名分类

欢迎提pull request

## Built With

- [Vue](https://cn.vuejs.org/index.html)
- [Element-UI](https://element.eleme.cn/#/zh-CN/component/quickstart)

## License

本项目基于 [MIT License](./LICENSE)

![donate](https://cdn.jsdelivr.net/gh/mizuka-wu/mizuka-wu.github.io@master/assets/donate.jpg)
