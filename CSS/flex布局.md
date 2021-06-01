# flex布局
flex布局，又称为‘弹性布局’。


采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

可重点关注下项目的flex属性。

参考：
知乎文章：https://zhuanlan.zhihu.com/p/136223806
Mdn介绍：https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox
阮一峰:http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

## 容器的属性
以下6个属性设置在容器上。

* flex-direction
* flex-wrap
* flex-flow：flex-direction与flex-wrap两个属性的简写形式。
* justify-content：主轴上的对齐方式。
* align-items：交叉轴上的对齐方式。
* align-content：多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

## 项目的属性
> order
> flex-grow
> flex-shrink
> flex-basis
> flex
> align-self
以下6个属性设置在项目上。

* order：定义项目在轴上的排列顺序。数值越小，排列越靠前，默认为0。

* flex-grow：定义项目的放大比例。
> 1. 默认为0，即如果存在剩余空间，也不放大。
> 2. 若所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。
> 3. 若一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

* flex-shrink：定义项目的缩小比例。
> 1. 默认为1，即如果空间不足，该项目将缩小。
> 2. 若所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。
> 3. 若一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

* flex-basis：项目占据的主轴空间（main size）。在分配多余空间之前，一般会参考该属性
```css
/* 默认值为auto(即项目本来的大小)，也可设为px等固定值 */
.item {
  flex-basis: <length> | auto; 
}
```

* flex：
> 1. flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
> 2. 该属性有四个快捷值：
> > initial (0 1 auto),即把flex元素重置为Flexbox的初始值。
> > auto (1 1 auto)
> > none (0 0 auto)
> > 1 (1 1 0)，可以平分容器空间。
> > > 若flex-basis设置为auto，则不会平分容器空间。是根据项目内容的大小来分的
> > > 设置flex：1, 会为flex-basis添加上单位 % 或单位 px
> > > ' flex: 1; ' === ' flex: 1 1 任意数字+任意长度单位; '


> 3. 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

* align-self


