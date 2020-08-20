# Seed 容器

## Seed 是如何组成的

![](/seed/design.png)

`Seed`如图，入口由`PagingTable`进行控制，`PagingTable`会根据输入的参数，动态的调整内部的**组件**是否显示，以及是否对应增加一系列的按钮

当然在控制叶脉呢之前，你可以先和后端把对应接口定义好，同时根据接口生成对应的 [SEED](./SEED) 然后再进行当前操作

顺带一题，后期也有计划试着根据`json-schema`和`yapi`直接生成，当然这是后话了

## 控制相关显示

其实说到底，大部分的操作就是对应着 **[CRUD](https://baike.baidu.com/item/crud/3606157?fr=aladdin)** 操作而已，所以根据这个`Seed`的相关接口和命名也照着这个思路，通过区分**List**, **Item**来表明操作对象，当然，也有一些拓展的接口不按照这个命名方法，这个就另说了

### 基本的行为控制参数

以下是这些基础的控制参数，对于`Seed`来说，都应该是一个`function`

- **fetchList** 显示**过滤**, **分页** 获取数据等操作
- **addItem** 增加按钮
- **updateItem** 更新按钮
- **deleteItem** 删除按钮

### 拓展行为控制

- **excel** 支持导出为 excel
- **updateList** 覆盖 excel 循环上传为改用此接口更新

### Slot 控制

一部分需要`slot`才知道是否能够控制显示，主要还是设计上的问题，个人期望这块将之后的行为控制完全交给使用者

- **batchList** 增加一个选择列，选择结果将回给这个 **slot-scope**

        exclude: /node_modules\/(?!(@mycompany)\/).*/,