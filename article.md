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

不以规矩，不成方圆。HTML 有语义化标签，CSS 有 BEM 规范，这些规范都帮助我们写出结构清晰的 HTML 架构（ps:布局部分使用语义化标签还挺适合的，这种局部小组件还是 div 一把梭了）。组件 HTML 结构如下：

```html
<div class="drawer-container">
  <div class="drawer">
    <div class="controls__container" ref="controls__container">
      <ul class="controls"></ul>
    </div>
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

通过负值将控件从抽屉内容区移出来

```css
.controls {
  position: absolute;
  top: -40px;
}
```

## 样式调整

因为抽屉支持在上下左右四个方向上放置，不同方向上定义的偏移方向都不同。因此需要定义不同的 css 类。通过传入的 position 值，利用 css 的级联特性应用样式

```html
<div
  class="drawer__container"
  :class="[positionClass,{'drawer__container--show':show}]"
></div>
```

```js
  data() {
    return {
      show: false,
      positionClass: this.position
    };
  },
```

```css
// 定义右侧的drawer，其余方向上的同理
// 通过css的级联，对不同方向上的drawer添加不同的样式
.right .drawer {
  height: 100vh;
  width: 100%;
  transform: translate(100%, 0);
  top: 0;
  right: 0;
}
```

### 控件

使得控件完全贴合内容区，不会因为控件的内容变化，比如控件内容为 show 和 hidden，由于切换的时候，两个单词长度不一样，而使得控件显示不完全，或者脱离内容区。

这种情况我们可以使用 JavaScript 动态计算。因为经常用到，还是封装成一个函数吧。还是拿右侧抽屉举例子:

```js
updateControlLayout() {
  // 获取控件的宽高
  const rect = this.$refs['controls'].getBoundingClientRect()
  if (this.position === 'right') {
    // 重新设置偏移量
    this.$refs['controls'].style['left'] = `-${rect.width}px`
  }
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

## openDrawer 钩子

函数`openDrawer`通过 prop 传入，`openDrawer`控制是否抽屉被打开。

利用事件委托，将 click 事件，mouseover 事件直接挂载到了`class=controls`的 ul 元素上，为了方便识别目标`li`元素，给每一个 li 元素添加 `:class="'control-'+idx"`

```html
<ul
  class="controls"
  @click="toggleDrawerShow"
  @mouseover="toggleDrawerShowByMouseover"
>
  <li
    v-for="(control,idx) in controlItems"
    class="control"
    :class="'control-'+idx"
    :key="idx"
  >
    <!-- xxx -->
  </li>
</ul>
```

```js
const onOpenDraw = this.openDrawer
if (!onOpenDraw) {
  return
}
// 获取到目标阶段指向的函数
const target = evt.target
//获取到代理事件的元素
const currentTarget = event.currentTarget
// 我们给openDraw传入target，currentTarget两个参数，具体由父组件决定如何实现
// openDraw函数返回值为true，打开抽屉，值为false,不打开抽屉
return (this.show = onOpenDraw(target, currentTarget))
```

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
