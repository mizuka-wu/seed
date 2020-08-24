# DSL 语法

> Seed最开始的目标还是基于数据表的，而数据库是二维表结构，所以`Seed DSL`也默认整个后台页面是一张二维表/视图表，提供的是一个 **一纬数组** 描述方案，当然也会有一定的机制兼容 **嵌套** 数据

## 基本语法

类似于[json-schema](http://json-schema.org/), `DSL`实际上也是也是用来描述`JSON`对象的，但是因为考虑的是单层数据结构，所以做了很大的精简

**DSL** 内单个属性可以用`{ key: string }`的方式来做简单的定义，然后通过 **数组** 的方式来保存**多个属性**和**属性的顺序**

理论上来说只要有`key`属性的话，就可以正常运作了，`Seed`的各个`compoent`内部都是通过`key`来获取和设定具体位置的数据，所以非常依赖`key`属性唯一（这点在`vue`）内也是一样，除了`key`属性外，其实`DSL`一共就三个常用属性

- **key** 对象的哪个`key`作为数据
- **label** 显示的名字，默认为`key`
- **render** 渲染方案, 类似**属性** 默认为`string`

::: tip Key是个好东西
比如数据的获取，链式获取依赖**key**, 定位**slot**依赖**key**, ji
:::

| 键      | 类型                            | 说明                                  |
| ------- | ------------------------------- | ------------------------------------- |
| key     | string                          | 对象的哪个`key`作为数据，支持链式调用 |
| label   | string                          | `table`中表头，`form`中**label**      |
| render  | null/string/(val, props) => JSX | 渲染方案，支持传入函数                |
| show    | null/boolean                    | 是否渲染，默认为 true                 |
| options | null/object                     | 剩余的参数都在这                      |

## 支持的渲染方案一览

如果找不到渲染方案，在`table`中会降级为字符串显示，在`form`中会降级为使用`input`

| render | table可用？ | form可用？ | 说明                                |
| ------ | ----------- | ---------- | ----------------------------------- |
| string | ☑️           | ☑️          | 默认的显示方案，直接纯字符串        |
| time   | ☑️           | ☑️          | 显示时间，默认为yyyy-MM-DD hh:mm:ss |
| enum   | ☑️           | ☑️          | 读取options内的enum自动匹配显示，支持{[key: any]: string}, {value: any, label:any}[], string[]等方案 |
| image   | ☑️           | ☑️          | 支持字符串或{url, thumbnail?, size?} |
| video   | ☑️           | ☑️         | 支持字符串或{url, thumbnail?, size?} |
| media   | ☑️           |          | 自动判断视频还是图片，慎用，支持字符串或{url, thumbnail?, size?} |
| textarea   | ☑️           | ☑️         | 大文本，表格内默认为3行，可通过设定line来配置数量，支持内容为富文本，form中不支持可视化编辑富文本 |

## 不同的组件渲染方案不一样的情况

通过在`options`中定义`form`, `filter`, `table`这三个属性，该属性下面的对象将会被合并到相应的`seed`对象上，这样就能完成合并啦

```javascript
{
    key: 'a',
    title: 'b',
    render: 'string',
    options: {
        form: {
            render: 'number'
        }
    }
}
```

将在`form`内被处理成

```javascript
{
    key: 'a',
    title: 'b',
    render: 'number',
    options: {
    }
}
```

## 特殊情况

考虑到`form`表单也可能在`update`和`add`的时候不同，`form`下的`options`内还支持`add`和`update`这两种合并方式，具体来说，`seed` 的多级合并可能复杂到

``` js
const seed = {
    key: 'a',
    title: 'b',
    render: 'number',
    options: {
        form: {
            options: {
                add: {},
                update: {}
            }
        },
        filter: {},
        table: {}
    }
}
```

## 最重要的几点

- 和[vue](https://cn.vuejs.org/v2/guide/index.html)等前端框架一样，`key`这个属性绝对不能重复
- `render`的影响是全局的，如果定义的话，请分别给`form`, `table`等地方分开定义，**起码`table`需要分开定义！**，否则`form`中出现纯文本？
