# 移动端适配的几种方法


rem 计算
```js
var designWidth = 375;  		// 设计稿宽度
var remPx = 100;               // 在屏幕宽度375px，的时候，设置根元素字体大小 100px

// document.documentElement.clientWidth 
var scale = window.innerWidth / designWidth； //计算当前屏幕的宽度与设计稿比例

// 根据屏幕宽度 动态计算根元素的 字体大小
document.documentElement.style.fontSize = scale * remPx + 'px';
```
根元素 fontSize 设置为 100px，只是为了方便，也可以设置成其他大小？




