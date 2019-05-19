## 设计

### prop

| 参数          | 说明               | 类型             | 可选值              | 默认值  |
| ------------- | ------------------ | ---------------- | ------------------- | ------- |
| triggerEvent  | 触发打开抽屉的事件 | String           | 'mouseover'/'click' | 'click' |
| controls      |                    | Array/Object     |                     |         |
| controlConfig | 控件的位置         |                  |                     |         |
| controlOffset | 控件的偏移         | String/Number    |                     |         |
| show          | 是否展示抽屉       | Boolean/Function |                     |         |

### slot

content，即抽屉里面的内容防止在默认插槽

如果想自定义控件，请放置在名为 `controls` 的具名插槽中
