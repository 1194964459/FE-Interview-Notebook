# CSS 样式隔离

参考：[vue中如何修改第三方组件库的样式？](https://www.doubao.com/thread/wd7c8ad4077f82ca1)

样式隔离，即样式仅作用于当前组件，避免影响其他组件。

组件样式是`<style>`的话，则这种样式是全局的！

## 一、如何实现样式隔离？
**1. `<style scoped>` 标签即可实现样式隔离**：   
当使用 scoped 时，给组件内**所有元素**添加 data-v-xxx 属性（xxx 是唯一哈希值），给 **scoped 样式的选择器**添加 `[data-v-xxx] 属性`，**样式只作用于当前组件的元素**。如果需要修改子组件（或第三方组件库）的样式，可以使用深度选择器穿透 scoped 的限制。

```js
<!-- DOM：自动添加 data-v-123（示例哈希值） -->
<div class="box" data-v-123>Hello</div>

<!-- CSS：自动添加 [data-v-123] 属性选择器 -->
.box[data-v-123] {
  color: red;
}
```

**2. 使用 CSS Modules**    
注意：这里是`<style module>`，模版中 通过 `$style.类名` 访问，Vue 会自动将**类名转换为唯一的哈希字符串**，确保不会与其他组件的类名冲突。

```js
<template>
  <div :class="$style.example">使用 CSS Modules</div>
</template>

<style module>
.example {
  color: green;
}
</style>
```

## 二、打破样式隔离的方法
**1. 使用深度选择器**    
深度选择器主要用于在 Vue、React 等框架中穿透样式隔离，修改**子孙组件**或**第三方组件库中组件的内部样式**  
* vue3中优先用`:deep() 伪类`，不过也支持`::v-deep`
* vue2中用`::v-deep`，Vue 2 不支持 `:deep()`

注意：`/deep/`不能在Less与Sass中使用，因为Less、Sass对 / 符号敏感，然后可能导致解析错误

**2. 使用！important 强制覆盖**

**3. 使用全局样式文件**   
在入口文件（如 main.js）中引入全局样式文件，这些样式不受 scoped 限制：

```js
// main.js
import './styles/global.css'
```

> 疑问❓：`.box[data-v-123]` 就是 类选择器 + 属性选择器的组合。为什么`.el-button（全局样式）`比 `.el-button[data-v-xxx]（scoped 样式）`的优先级更高？而且scoped的权重还高...  （参考：[css样式权重和优先级](../CSS/css样式权重和优先级.md)）
> * 全局样式：1 个类选择器 → 权重 10（简化值）。
> * scoped 样式：1 个类选择器 + 1 个属性选择器 → 权重 20（数值更高）。
> 
> 在渲染逻辑中，“裸” 选择器（.el-button）比 “带额外条件的选择器”（.el-button [data-v-xxx]）更 “通用”。当两个选择器都能匹配元素时，浏览器会认为 “通用选择器” 应该覆盖 “更具体的选择器”，这是 CSS 设计时为了保证 “**全局样式能正常覆盖局部样式**” 的合理逻辑。

**4. 通过 `::v-global` 声明全局样式**
在 scoped 样式中，使用 `::v-global` 声明全局样式片段，无需单独创建 `<style>` 标签。
```js
<style scoped>
/* 局部样式 */
.container {
  margin: 20px;
}

/* 全局样式（修改第三方组件） */
::v-global(.el-dialog__header) {
  background-color: #f5f5f5;
  padding: 16px;
}
</style>
```