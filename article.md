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

不以规矩，不成方圆。HTML 有语义化标签，CSS 有 BEM 规范，这些规范都帮助我们写出结构清晰的 HTML 架构。组件 HTML 结构如下：

```html
<div class="drawer-container">
  <div class="drawer">
    <div class="controls"></div>
    <div class="content"></div>
  </div>
</div>
```

## 如何实现抽屉的效果

作为一个优秀的组件，我们支持了抽屉放置在网页上下左右的边缘。我们拿贴在右侧的抽屉(实际代码与它不完全相同)举例：

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
  transform: translate(0);
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

### 滚动条

当内容过长的时候，打开抽屉的时候，滚动条还在。因此我们需要在抽屉打开的时候打开滚动条。代码也很好写，给`document.body`添加`overflow:hidden`属性。这里有一个小小的坑。原先的 css 是置于 scope 里面的，如果想要把这个属性添加到 body 上，是不成功的。把 scoped 去了即可。

```css
<style scoped>
.hidden_scoll_bar{
  overflow: hidden;
}
</style>

```

## props

我们需要`defaultShow`控制抽屉的展开。

## 钩子

`openDrawer`控制是否抽屉被打开。这里的实现方式，类似事件委托。

## 事件

作为一个优秀的组件，我们支持当抽屉打开后，点击抽屉外部分收起。

```js
closeSidebar(evt) {
  // Element.closest() 方法用来获取：匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 null。
  const parent = evt.target.closest(".drawer");
  // 点击抽屉以外部分，即匹配不到，parent值为null
  if (!parent) {
    this.show = false;
  }
}
```

全局监听点击事件

```js
window.addEventListener('click', this.closeSidebar)
```

我一开始的做法是，组件挂载的时候，全局监听点击事件，组件销毁时移除点击事件。但我们可以做的更好，当 controls 被点击时，添加点击事件，收起抽屉的时候，移除点击事件。减少全局监听的 click 事件。

除了点击事件，我们也顺便支持一下 hover 的操作。鼠标移出收起的操作和点击抽屉外部分收起的代码相同。

通过`e.type`判断是点击事件还是鼠标移入事件。

```js
 toggleDrawerShow(e) {
    if (e.type === "mouseover" && this.triggerEvent === "mouseover") {
      // do some thing
    }
    if (e.type === "click" && this.triggerEvent === "click") {
      // do some thing
    }
}
```
