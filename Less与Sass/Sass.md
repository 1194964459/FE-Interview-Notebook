# Sass

SCSS 是 Sass 3.0 后推出的「兼容 CSS 的语法」，核心功能完全一致，仅语法风格不同

* 变量：$
* 嵌套：与Less类似
* 混合器

混合器使用@mixin标识符定义，可以轻易地通过引用这个名字重用这段样式。
```css
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```
通过@include来使用这个混合器。@include调用会把混合器中的所有样式提取出来放在@include被调用的地方。
```css
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}

//sass最终生成：

.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```
