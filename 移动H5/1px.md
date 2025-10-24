参考：

【有道云笔记】视口
https://share.note.youdao.com/s/POaxrXR3

【有道云笔记】移动H5  1px问题
https://share.note.youdao.com/s/V8RR2HLJ



https://zhuanlan.zhihu.com/p/34931318


```js
// 此处以设置1px的border为例：
// html:
<div class="bordert1px"></div>

// css：
.bordert1px {
    width:100px；  // 此处随便设置个width、height
    height:100px；
    border: none;
    position: relative;  //
}

.bordert1px:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border:1px solid #8AC1EA;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: left top;
}
```
