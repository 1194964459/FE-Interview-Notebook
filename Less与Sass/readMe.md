# Less 与 Sass

参考：
* https://www.cnblogs.com/tommymarc/p/11627576.html
* https://juejin.cn/post/6844904169313140749#heading-23

## CSS有具体以下几个缺点：

语法不够强大，比如**无法嵌套书写**，导致模块化开发中需要书写很多**重复**的选择器；
**没有变量和合理的样式复用机制**，使得逻辑上相关的属性值必须以字面量的形式重复输出，导致难以维护。


## 异同
**1. 相同点**：
* 变量
* 混合
* 嵌套
* 函数
* 运算

**2. 不同点**：
* LESS环境较Sass简单
* 从功能出发，Sass较Less略强大一些。如：条件控制（if/else）
* 处理机制不同：Less是通过客户端处理的，Sass是通过服务端处理，Less的解析会慢一点

**3. 其他**：
css的@import规则：只有执行到@import时，浏览器才会去下载其他css文件，这导致页面加载起来特别慢。
sass的@import规则，sass的@import规则在生成css文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个css文件中，而无需发起额外的下载请求。

**4. px 转 vw 示例：**
```css
/* iPhone 6 尺寸作为设计稿基准 */
$vw_base: 375px;
@function vw($px) {
    @return ($px / $vw_base) * 100vw;
}
```