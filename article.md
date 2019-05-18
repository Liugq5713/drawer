# [实战]如何写好一个 vue 组件，老夫一年的经验都在这里了

## 设计

首先，这个组件有个通用的名字，叫抽屉（Drawer），组件结构分为控件和内容两部分。如图：

```text
           +-----------------------+
           |                       |
   +-------+                       |
   |       |                       |
   |       |                       |
   |       |       content         |
controls   |                       |
   |       |                       |
   |       |                       |
   |       |                       |
   +-------+                       |
           |                       |
           +-----------------------+
```

不以规矩，不成方圆。HTML 有语义化标签，CSS 有 BEM 规范，这些规范都帮助我们写出结构清晰的 HTML 架构。

```html
<div class="drawer-container">
  <div class="drawer">
    <div class="controls"></div>
    <div class="content"></div>
  </div>
</div>
```

## 如何实现抽屉的效果

我们拿贴在右侧的抽屉(实际代码与它不完全相同)举例：

### 抽屉的展开收起

我们定义好抽屉的大小，并将其 postion 设置为 fixed，使用 top，right 属性，将其固定在右侧。因为抽屉默认是收起的，然后通过 translate 将其移除可视区。

```css
.drawer {
  width: '300px';
  height: '100vh';
  position: fixed;
  top: 0;
  right: 0;
  transform: 'translate(100%,0)';
}
```

抽屉展开的代码也很简单，在通过 translate 将其移回来

```css
.drawer__container--show .drawer {
  transform: translate(0) !important;
}
```

### 控件

通过负值将控件移出来

```css
.controls {
  position: absolute;
  top: -40px;
}
```

## 样式调整

### 控件

使得控件完全贴合内容区，不会因为控件的内容而使得控件显示不完全，或者脱离内容区。

这种情况当然是使用万能的 JavaScript 了啊。还是拿右侧抽屉举例子:

```js
// 获取控件的宽高
const rect = this.$refs['controls'].getBoundingClientRect()
if (this.position === 'right') {
  // 重新设置偏移量
  this.$refs['controls'].style['left'] = `-${rect.width}px`
}
```

### 动画

[贝塞尔曲线](https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function)了解一下

```css
transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
```

## props

## 钩子

## 事件
