# 抽屉（drawer）组件

a vue ui component ，[项目预览DEMO地址](https://so-easy.cc/drawer/demo.html)

## drawer 属性

| 参数          | 说明               | 类型          | 可选值              | 默认值  |
| ------------- | ------------------ | ------------- | ------------------- | ------- |
| triggerEvent  | 触发打开抽屉的事件 | String        | 'mouseover'/'click' | 'click' |
| controls      | 控件显示的值       | Array/Object  |                     |         |
| position      | 控件显示位置       | String        |                     | 'right' |
| position      | 控件显示位置       | String        |                     | 'right' |
| controlOffset | 控件的偏移         | String/Number |                     |         |
| contentSize   | 抽屉内容大小       | String        |                     | '300'   |
| openDrawer    | 是否打开抽屉       | Function      |                     |         |

### 详细说明

#### controls

默认值为

```js
controls = {
  showText: '显示',
  hidden: '隐藏'
}
```

如果需要添加多个空间，可以传入数组

```js
const controls = [
{
    show:'显示',
    hidden:'隐藏'
},
{
    show:'露出,
    hidden:'消散''
}
]
```

### slot

- 默认插槽

抽屉里面的内容

- 具名插槽

插槽名：`controls` ，满足自定义控件的需求

