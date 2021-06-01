### 是否脱离文档流

* display:none：使元素脱离文档流，不占据文档空间，会引起页面的重排
* visibility:hidden：不会脱离文档流，元素不可见 但仍然占据文档位置，引起页面重绘
* opacity:0：同 visibility:hidden
 

### 继承 
* display:none：不会被子元素继承，但是父元素都不在了，子元素自然也就不会显示了
* visibility:hidden：子元素设置为 visibility:visible，可以单独显示
* opacity:0：该属性不是继承属性

### 事件
* display:none：无法添加事件
* visibility:hidden：无法添加事件
* opacity:0：可以添加事件

### 过渡动画
* display：display对于transition 肯定是无效的；
* visibility：display对于transition 也是无效的；
* opacity：display对于transition 是有效.