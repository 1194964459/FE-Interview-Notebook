# 移动端适配的几种方法


【有道云笔记】视口
https://share.note.youdao.com/s/POaxrXR3

【有道云笔记】移动H5  1px问题
https://share.note.youdao.com/s/V8RR2HLJ


讲解的超级详细，有图画、有代码：
https://blog.csdn.net/weixin_57677300/article/details/129164050

内容很精简：
https://blog.csdn.net/weixin_37632943/article/details/95471535?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.baidujs&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.baidujs

https://juejin.cn/post/6959047144065990663

https://www.zhihu.com/question/63663871


## 如何计算跟字体的font-size
法1：根字体公式：设备宽度 ÷ 10
让根字体大小与 “设备宽度” 直接等比（设备宽 100px → 根字体 10px；设备宽 200px → 根字体 20px）。

法2：(设备宽度 / 设计稿宽度)×10 
假设1rem就是10px，或者根字体设为62.5%
让根字体大小与 “设计稿宽度的比例” 等比（设备宽是设计稿宽的多少倍，根字体就是 10px 的多少倍）。这种有个缺点：不稳定，因为设备宽度/设计稿宽度不一定能整除，不过前端换算比较方便




移动端适配设置一个元素尺寸时，UI设计稿是px单位。假如基于rem方案来的，根元素的fontSize设置为多少都可以，只要元素设置的rem数值 乘以 根元素中1个rem设置的px数 等于设计稿的px值就可以。

移动端设计稿通常以iPhone 6为标准，但具体尺寸是750px（物理像素宽度）而不是iPhone 6的逻辑像素宽度375px


## rem 计算
```js
var designWidth = 375;  		// 设计稿宽度
var remPx = 100;               // 在屏幕宽度375px，的时候，设置根元素字体大小 100px

// document.documentElement.clientWidth 
var scale = window.innerWidth / designWidth； //计算当前屏幕的宽度与设计稿比例

// 根据屏幕宽度 动态计算根元素的 字体大小
document.documentElement.style.fontSize = scale * remPx + 'px';
```
根元素 fontSize 设置为 100px，只是为了方便，也可以设置成其他大小？


```js
// js获取布局视口：
document.documentElement.clientWidth | document.body.clientWidth；

// js获取视觉视口
window.innerWidth

// js获取理想视口：
window.screen.width

理想视口宽度 = 移动设备横向分辨率 / DPR
```