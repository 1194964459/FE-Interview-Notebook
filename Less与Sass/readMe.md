# Less 与 Sass

参考：
* https://www.cnblogs.com/tommymarc/p/11627576.html
* https://juejin.cn/post/6844904169313140749#heading-23

## CSS有具体以下几个缺点：

1. **无法嵌套书写**，导致模块化开发中需要书写很多**重复**的选择器；

2. CSS中的变量，是在运行时解析：
    定义变量：--变量名: 变量值;
    使用变量：var(--变量名, 默认值)

Sass/Less变量（$var/@var）是在预编译时解析（构建阶段，编译为原生 CSS 后变量消失）

3. 仅支持calc() 简单计算，Sass/Less还支持数值、颜色、复杂逻辑计算
4. 不支持 条件/循环 等逻辑控制


## Less 与 Sass 异同
**1. 相同点**：
* 变量
* 混合
* 嵌套
* 函数
* 运算

**2. 不同点**：
* Sass比Less的生态更成熟、功能更完备、适配主流组件库（AntD、Element Plus），长期维护成本更低
* 从功能出发，Sass较Less略强大一些。如：条件控制（if/else）
* 处理机制不同：Less是通过客户端处理的，Sass是通过服务端处理，Less的解析会慢一点

SCSS 是 Sass 3.0 后推出的「兼容 CSS 的语法」，核心功能完全一致，仅语法风格不同

基础增强选 Less，复杂逻辑选 SCSS

React 选 SCSS；
Vue2 旧项目可选 Less
Vue 3 新项目：Vite 对 SCSS/LESS 支持无差异，但 Element Plus、Naive UI 等主流组件库底层用 SCSS

### Sass
Sass支持 自定义函数（@function），Less需通过 Mixins 模拟，语法繁琐	
Sass支持 条件判断（@if/@else if），Less仅支持基础 @if/@else，无多分支语法


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

## Tailwind 



## Vue中的样式Scoped
无 scoped 时：组件的 CSS 是全局生效的
有 scoped 时：组件的 CSS 仅对自身模板内的元素生效，