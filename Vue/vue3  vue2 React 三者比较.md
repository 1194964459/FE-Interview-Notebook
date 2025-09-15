# vue3、vue2、React 三者比较

### 一、Vue2 的 Object.defineProperty有什么缺点？
1. 只能劫持对象已存在的属性，无法监听 “动态新增/删除的属性”。解决：需要通过`this.$set` 和 `this.$delete` 方法强制触发更新，非常繁琐。
2. Vue2 在处理数组时，是通过重写数组的 7 个原型方法（push、pop、shift、unshift、splice、sort、reverse）来监听数组变化的。通过索引、长度来修改数组 是不会触发更新的。解决：需要用 `this.$set(list, 0, 100)` 才能触发更新。
    ```js
    const list = [1, 2, 3]
    list[0] = 100  // Vue2 无法监听，视图不更新
    list.length = 0  // Vue2 无法监听，视图不更新
    ```
3. 对于嵌套对象（如 data.user.info），Vue2在初始时就必须递归遍历所有子属性并逐个劫持，初始化性能差！

Proxy完美解决了上面几个问题，并且
* 对于嵌套对象在初始化时，Proxy 不会递归劫持所有子属性，而是在访问子属性时才动态劫持（惰性处理）。
* Proxy不仅能代理对象和数组，还能代理 Map、Set 等复杂数据结构

## 二、Vue3与Vue2比较
Vue3 在**性能、TypeScript 支持和代码组织**上优于 Vue2，同时保持了易用性；

### 优点 
1. **性能提升** 
    * **响应式系统重构**：
        * Vue3 使用 Proxy 替代 Vue2 的 Object.defineProperty，解决了**深度监听**和**动态属性添加**的限制，性能更好；

    * **编译优化**：
        * 重写了虚拟 DOM，在内存使用、渲染性能方面均提升不少（约50%）；
        * 引入静态提升、静态标记(PatchFlag) 等优化策略，减少不必要的 DOM 操作。

2. **新增 组合式 API**：
    * 解决了 Vue2 选项式 API 在大型项目中逻辑分散的问题，代码更易**组织**和**复用**。
    * 对应的生命周期钩子也发生了变化：以on开头，destory相关的钩子变成unmount

3. **更好的 TypeScript 支持**：
    * Vue3是用TS写的，有完整的**类型定义**，组件 props、事件、生命周期等都能获得精确的**类型推断**。
    * Composition API **天然支持类型推导**
        > 类型推断：基于源码的类型定义实现精确推断  
        > 类型推导：在具体使用时根据传的值来进行推导。如：`const count = ref(0);`，TS 能自动推导 count.value 的类型是 number

4. **新增特性**：内置 Fragment、Teleport 和 Suspense 组件，简化复杂场景的实现。（Fragment是多根节点，不用像以前一样需包裹在一个div中）

5.  **更友好的开发体验**：
    * 模板支持可选链（?.）、空值合并（??）等现代 JS 语法
    * 全局 API 改为实例化方式（createApp），避免 Vue2 中全局配置的污染问题，支持多个应用实例隔离。

6. **更小的包体积**：通过 Tree-shaking 移除未使用的代码，核心体积比 Vue2 更小。

### 缺点
- 学习成本增加：组合式 API 需要重新学习，对 Vue2 老用户有一定门槛。
- Vue2到Vue3迁移成本较高！

## Vue3中将全局 API 改为实例化方式（createApp），怎么理解?
Vue2 中，所有全局配置（如注册插件、指令等）都是通过 **Vue 这个全局对象**来的。例如：
```js
// Vue2 代码
import Vue from 'vue'
import VueRouter from 'vue-router'

// 全局注册插件：直接修改 Vue 构造函数
Vue.use(VueRouter)

// 全局注册组件：直接挂载到 Vue 构造函数上
Vue.component('my-component', { ... })

// 创建应用实例
new Vue({ el: '#app' })
```

这种方式的问题在于：
* **全局配置共享**：所有通过 **Vue.use、Vue.component** 注册的内容，**会被所有 Vue 实例共享**。如果在一个页面中创建多个 Vue 实例（如 `new Vue({ el: '#app1' })` 和 `new Vue({ el: '#app2' })）`，它们会**共用一套全局配置，无法隔离**。
* **污染风险**：如果第三方库也修改了 Vue 全局对象，可能会覆盖你的配置。

### Vue3是怎么做的呢？
配置是挂载在createApp创建的实例上，而非全局对象。通过实例来隔离
```js
import { createApp } from 'vue'
const app = createApp(App)
// 2. 配置仅作用于当前实例
app.use(VueRouter) // 插件只注册到 app 实例
app.component('my-component', { ... }) // 组件只注册到 app 实例
```

## Vue3与React比较
