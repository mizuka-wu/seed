# DSL 语法

## 基本语法

**DSL** 主要还是通过`javascript`对象的形式表现，同时为了保证顺序性，通过数组的方式来保存顺序，每个 `seed` 对象都决定了在`form`和`table`中每一个字段的渲染方式，简单来说，每个`seed`对象都具有以下几个属性

- **key** 获取传入对象的哪个`key`作为数据，支持`a.b.c`这类的链式调用
- **label** 显示的名字，`table`中作为表头，`form`中作为**label**
- **render** 渲染方案，支持传入函数

| 键      | 类型                                           | 说明                                                       |
| ------- | ---------------------------------------------- | ---------------------------------------------------------- |
| key     | string                                         | 获取传入对象的哪个`key`作为数据，支持`a.b.c`这类的链式调用 |
| label   | string                                         | 显示的名字，`table`中作为表头，`form`中作为**label**       |
| render  | null/string/(value, options, slotScope) => JSX | 渲染方案，支持传入函数                                     |
| show    | null/boolean                                   | 是否渲染，默认为 true                                      |
| options | null/object                                    | 剩余的参数都在这                                           |

## 不同的组件渲染方案不一样？

通过在`options`中定义`form`, `filter`, `table`这三个属性，该属性下面的对象将会被合并到相应的`seed`对象上，这样就能完成合并啦

### 例

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

## 最重要的一点

和[vue](https://cn.vuejs.org/v2/guide/index.html)等前端框架一样，`key`这个属性绝对不能重复
