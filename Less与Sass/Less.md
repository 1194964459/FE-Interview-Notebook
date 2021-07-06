# Less 

* 变量（Variables）
```css
@width: 10px;
```

* 混合（Mixins）：可以复用CSS代码..
```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();  /* 复用bordered类包含的属性  */
}
```

* 嵌套（Nesting）
```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
```
可转化为：
```css
#header {
  color: black;
  
  .navigation {
    font-size: 12px;
  }
}
```
* @规则嵌套和冒泡，如@media

* 运算：算数运算符 +、-、*、/ 可以对任何数字、颜色或变量进行运算
* calc() 特例
* import

如果导入的文件是 .less 扩展名，则可以将扩展名省略掉：