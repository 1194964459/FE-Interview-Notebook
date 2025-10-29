# getBoundingClientRect
getBoundingClientRect() 方法会返回一个包含元素尺寸（width、height）以及相对于视口的距离（top、right、bottom、left）的对象。返回值的具体含义：
* top：元素顶部到视口顶部的距离（随滚动变化）。
* bottom：元素底部到视口顶部的距离（随滚动变化）。
* left：元素左侧到视口左侧的距离（随滚动变化）。
* right：元素右侧到视口左侧的距离（随滚动变化）。
* width：元素自身的宽度。
* height：元素自身的高度。

元素相对视口的各种位置：
* 如果元素在视口上方：top 的值会小于0。
* 如果元素在视口下方：bottom 的值会大于视口的高度。
* 如果元素在视口左侧：left 的值会小于 0。
* 如果元素在视口右侧：right 的值会大于视口的宽度。 

## 视口信息（Viewport）
指浏览器当前可见区域的尺寸和滚动距离，主要通过以下属性获取：
* window.innerWidth：视口的宽度（包含滚动条）。
* window.innerHeight：视口的高度（包含滚动条）。
* window.scrollX（或 pageXOffset）：页面横向滚动的距离，即左侧不可见区域的宽度。
* window.scrollY（或 pageYOffset）：页面纵向滚动的距离，即上方不可见区域的高度。

若考虑兼容性，更详细的信息看：[可视窗口](./可视窗口.md)

## 如何判断元素在视口内？
从纵向看，排除掉 2 种情况：出现在视口下方（top大于innerHeight）、出现在视口上方（bottom < 0）。所以纵向在视口内的条件是：
`element.bottom > 0` && `element.top < window.innerHeight`。

横向在视口内：`element.right > 0` && `element.left < window.innerWidth`，即 元素左侧小于视口宽度，且元素右侧大于 0
