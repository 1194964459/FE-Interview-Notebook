# 移动端适配的几种方法


【有道云笔记】视口
https://share.note.youdao.com/s/POaxrXR3

【有道云笔记】移动H5  1px问题
https://share.note.youdao.com/s/V8RR2HLJ


讲解的超级详细，有图画、有代码：
https://blog.csdn.net/weixin_57677300/article/details/129164050


知乎上点赞贼多
https://www.zhihu.com/collection/990708757

内容很精简：
https://blog.csdn.net/weixin_37632943/article/details/95471535?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.baidujs&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.baidujs

https://juejin.cn/post/6959047144065990663

https://www.zhihu.com/question/63663871

## 移动端适配的几种方式
* rem
* vw/vh
* 百分比
* flex弹性布局
* 媒体查询：需要针对不同的屏幕进行单独设置



## 如何计算跟字体的font-size
法1：根字体公式：`设备宽度 ÷ 10`
让根字体大小与 “设备宽度” 直接等比（设备宽 100px → 根字体 10px；设备宽 200px → 根字体 20px）。

法2：`(设备宽度/设计稿宽度)×10` 
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

## rem与vw 对比
| 维度| 	rem 分 10 份方案| 	vw 方案| 
| ---- | ---- | ---- | 
| 依赖| 	需要 JS 动态计算根字体（初始化 + resize）| 	纯 CSS，依赖浏览器对 vw 的原生支持| 
| 单位换算|  设计稿 px ÷ （设计稿宽 / 10）= rem 值（如 375px 设计稿 ÷37.5）| 	设计稿 px ÷ （设计稿宽 / 100）= vw 值（如 375px 设计稿 ÷3.75）| 
| 灵活性| 	可通过修改根字体公式调整缩放比例（如限制最大 / 最小根字体）| 	缩放比例固定为 “视口百分比”，无法直接调整整体缩放系数| 
| 兼容性| 	兼容到 IE9+（rem 支持 IE9+，JS 逻辑无兼容问题）| 	兼容到 IE11+（IE10 及以下不支持 vw）| 

vw 更简洁（无需 JS），但 rem 方案的灵活性在某些场景下更优：
1. 兼容旧设备：若项目需要兼容 IE9/10，vw 无法使用，此时 rem 方案是更稳妥的选择。
2. 可控制缩放范围：例如在大屏设备（如平板）上，可通过 JS 限制根字体的最大值，避免元素过大：
```js
function setRem() {
  const deviceWidth = document.documentElement.clientWidth;
  const maxWidth = 750; // 超过750px的设备，根字体不再增大
  const fontSize = Math.min(deviceWidth / 10, maxWidth / 10);
  document.documentElement.style.fontSize = fontSize + 'px';
}
```
而 vw 方案若要限制最大尺寸，需额外写媒体查询，不够直观。

## 窗口与视口：
窗口是浏览器的物理容器，如拖动窗口边缘 改变的就是窗口大小。

视口有三种：
* 布局视口：计算 CSS 布局的，网页布局的 “基准坐标系”。
* 视觉视口：当前实际能看到的网页区域，一般是用于判断是否在视口内..
* 理想视口：让布局视口宽度等于设备逻辑宽度

```js
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  // width=device-width 是设置布局视口等于设备的逻辑宽度
```
```js
// js获取布局视口：
document.documentElement.clientWidth | document.body.clientWidth；

// js获取视觉视口
window.innerWidth

// js获取理想视口：
window.screen.width

理想视口宽度 = 移动设备横向分辨率 / DPR
```

## 几种宽度值：
* **物理屏幕宽度**：是*屏幕硬件的实际像素数量*（比如 iPhone 14 物理宽度是 2532 个物理像素）。
* **设备逻辑宽度**：是*物理屏幕宽度除以设备像素比（DPR）*得到的逻辑像素值，就是人看到的手机屏幕的宽度。（比如 iPhone 14 物理宽度 2532px，DPR=3，逻辑宽度 = 2532 ÷ 3 = 390px）。
* **浏览器窗口的逻辑宽度**：一般用于PC端，PC浏览器的**布局视口**的宽度 默认与**浏览器窗口**的逻辑宽度一致。拖动窗口边缘 会改变窗口的宽度，因此PC端是`浏览器窗口的逻辑宽度 <= 设备逻辑宽度`。对于移动端来说，布局视口宽度、窗口宽度
* **布局视口宽度**：浏览器内置的默认值（如 980px、1024px，不同浏览器略有差异），不过开发者可以通过`<meta name="viewport"> 标签修改布局视口
* **网页宽度**是由网页的内容结构和 CSS 样式决定。


## 几种关系梳理：
1. 布局视口 与 设备逻辑宽度 的关系：
移动端，设备逻辑宽度（如 390px）远小于布局视口（980px），**浏览器需要让整个布局视口（980px 的内容）完整显示在手机屏幕（390px）里。因此，页面会被整体缩小，导致元素极小**。毕竟 又不能只展示部分布局！！

2. 布局视口 与 网页宽度 的关系：
**网页宽度**是由网页的内容结构和 CSS 样式决定
**布局视口宽度**是**浏览器内置的默认值**（如 980px、1024px，不同浏览器略有差异），不过开发者可以通过 
若 网页宽度 ≤ 布局视口：内容居中或填满布局视口，无滚动条；
若 网页宽度 > 布局视口：内容超出布局视口，出现横向滚动条（需左右滑动查看）。

3. 浏览器窗口的宽度(PC窗口可变)、设备逻辑宽度(固定值)、布局视口的宽度三者关系：
    * PC端：`布局视口的宽度`永远等于`窗口的宽度`，小于等于 `设备逻辑宽度`，可以拖动改变窗口大小
    * 移动端：默认全屏展示 窗口不能缩放，`窗口的宽度`永远等于`设备逻辑宽度`。移动端浏览器默认的布局视口是一个较大的固定值，而窗口宽度远小于这个值，所以需要设置 viewport 标签（width=device-width）让布局视口宽度 = 窗口宽度，

## 桌面端与移动端视口的核心区别
| 维度| 	移动端视口特点	| 桌面端视口特点| 
| ---- | ---- | ---- | 
| 布局视口默认值	| 默认值较大（如 980px），远大于设备逻辑宽度（为了兼容桌面网页）。| 默认值接近浏览器窗口宽度（如窗口宽 1200px，布局视口约 1200px），与屏幕尺寸匹配。| 
| 理想视口必要性	| 必须通过 <meta name="viewport" content="width=device-width"> 手动开启，否则页面会被缩小（元素极小）。| 	无需手动设置，默认就是 “理想视口”（布局视口 = 窗口宽度），网页自然适配窗口。| 
| 缩放对布局的影响	| 开启理想视口后，缩放仅改变视觉视口，布局视口不变（保证布局稳定）。| 	缩放时，布局视口和视觉视口同步变化（如放大 200%，布局视口和视觉视口都变为原来的 1/2）。| 
| 设备逻辑宽度| 	逻辑宽度较小（如手机 390px），与物理像素通过 DPR 关联（需适配高密度屏幕）。| 	逻辑宽度较大（如显示器 1920px），DPR 通常为 1（逻辑像素≈物理像素）。| 
