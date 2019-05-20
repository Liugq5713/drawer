## 设计

### prop

| 参数          | 说明               | 类型          | 可选值              | 默认值  |
| ------------- | ------------------ | ------------- | ------------------- | ------- |
| triggerEvent  | 触发打开抽屉的事件 | String        | 'mouseover'/'click' | 'click' |
| controls      | 控件显示的值       | Array/Object  |                     |         |
| position      | 控件显示位置       | String        |                     | 'right' |
| position      | 控件显示位置       | String        |                     | 'right' |
| contentSize   | 抽屉内容大小       | String        |                     | '300'   |
| controlOffset | 控件的偏移         | String/Number |                     |         |
| openDrawer    | 是否打开抽屉       | Function      |                     |         |

### slot

content，即抽屉里面的内容防止在默认插槽

如果想自定义控件，请放置在名为 `controls` 的具名插槽中
