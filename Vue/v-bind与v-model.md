# v-bind 与 v-model
# v-bind（单向绑定）
v-bind是动态绑定属性（单向），当数据变化后，更新视图！可绑定普通属性、class、style、prop 等

以`:src="imageUrl"`为例，阐述**v-bind的底层原理**：
1. Vue 在编译模板时，会将 v-bind 指令解析为 渲染函数：createVNode
2. 当渲染函数执行时，Vue 会通过 响应式系统 追踪依赖imageUrl。
    > 渲染函数的首次执行：beforeCreate → created → **beforeMount** → **执行渲染函数** → 生成虚拟 DOM → 渲染为真实 DOM → **mounted**
3. 当imageUrl的**值发生变化**时，会触发依赖的更新，即**重新执行渲染函数**；生成新的虚拟 DOM，然后进行Dom Diff，计算出需要更新的属性，最后，调用原生 DOM API 更新真实 DOM。

## 绑定clss
Vue对 class 和 style 的 v-bind 用法提供了增强。除了字符串外，表达式的值也可以是对象或数组。

* 对象形式：适合**多条件独立控制多个类**的场景，逻辑清晰，避免冗余。
* 数组形式：适合**固定类**或**动态类名**场景，写法简洁。

### 一、对象形式  `:{class: {类名: 条件}`，用布尔值控制 单个类是否生效
1. 内联字面量：
```js
// 模版中：
<div :class="{ active: isActive }"></div>

// JS：
const isActive = ref(true)
```
active 是否存在取决于数据属性 isActive 的真假值。

2. 直接绑定一个对象：更推荐，复用性、可读性高
```js
// 模版中：
<div :class="classObject"></div>

// JS：
const classObject = reactive({
  active: true,
  'text-danger': false
})
```
### 二、数组形式  `:{class: [类名1, 类名2]}`
1. 条件类：需要用三元表达式控制单个类！
```js
<div :class="[ 
    'base-style',                // 固定应用 base-style 类
    isActive ? 'active' : ''     // 条件判断是否应用 active 类
]"></div>
```

2. 固定类 + 少量条件类
```js
<div :class="['base-card', isHighlighted ? 'highlight' : '']"></div>
```

3. 动态类：**类名来自变量**，数组形式更方便
```js
// 模板
<div :class="[dynamicClass]"></div>

// JS:
const dynamicClass = ref('theme-dark')
```

## 绑定style
与绑定 class 类似！

# v-model（双向绑定）
主要用于**表单元素**，实现**数据与视图的双向同步**。数据变化时更新视图，用户操作视图（如输入内容）时也会反向更新数据。

语法：`v-model="数据"`

v-model的**本质**：`v-bind（绑定值） + v-on（监听输入事件）的组合`

# 核心区别
| 指令	| 作用	| 数据流向| 	适用场景| 
| ---- | ---- | ---- | ---- | 
| v-bind	| 动态绑定属性（单向）| 	数据 → 视图	| 普通属性、class、style、prop 等| 
| v-model	| 表单元素的双向数据绑定| 	数据 ↔ 视图（双向）| 	表单控件（input、select 等）| 