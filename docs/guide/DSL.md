# DSL 语法

## 基本语法

**DSL** 主要还是通过`javascript`对象的形式表现，同时为了保证顺序性，通过数组的方式来保存顺序，每个 `seed` 对象都决定了在`form`和`table`中每一个字段的渲染方式，简单来说，每个`seed`对象都具有以下几个属性

- **key** 获取传入对象的哪个`key`作为数据，支持`a.b.c`这类的链式调用
- **label** 显示的名字，`table`中作为表头，`form`中作为**label**
- **render** 渲染方案，支持传入函数

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

```javascript
{
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
