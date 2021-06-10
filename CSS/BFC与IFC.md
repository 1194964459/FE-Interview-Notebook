# BFC 与 IFC
参考：https://blog.csdn.net/sinat_36422236/article/details/88763187

## 一、BFC

### 布局规则：
* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
* 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。（浮动，自适应2列布局）
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算。(高度塌陷)


### 如何创建：
* 根元素；
* float的属性不为none；
* position为absolute或fixed；
* display为inline-block，table-cell，table-caption，flex；
* overflow不为visible


### 应用场景：
* 自适应两栏布局
* 撑起浮动高度
* margin重叠



## 二、IFC
IFC（inline Formatting Context）叫做“行级格式化上下”

**局规则如下：**
* 内部的盒子会在水平方向，一个个地放置；
* IFC的高度，由里面最高盒子的高度决定；
* 当一行不够放置的时候会自动切换到下一行；
