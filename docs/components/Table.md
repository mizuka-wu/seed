# TableSeed

## 参数

### seeds

- 类型: `Seed[]`
- 必填: 是

基本属性，根据`Seed`配置生成整个列表

### rowKey

- 类型: `string`
- 默认值: `_key`

会根据这个属性绑定每一行的 key，如果没有的话，在获取`fetchList`的之后会为每一行生成一个`uuid`

#### 参考

- [row-key](https://element.eleme.cn/#/zh-CN/component/table)
