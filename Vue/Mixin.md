# Mixin
Mixin 是 Vue 中一种逻辑复用机制，本质是一个 “包含组件选项（data、methods、生命周期钩子等）的对象”。当组件引入 Mixin 后，Mixin 中的所有选项会合并到组件自身的选项中，实现逻辑复用（无需重复写相同代码）。

Vue2用的多点，Vue3被组合式API取代了


1. 来源不明的逻辑（隐式依赖）：
组件引入 Mixin 后，无法直观区分 “组件自身的逻辑” 和 “Mixin 注入的逻辑”。例如：组件中突然出现一个 count 数据，但不知道是哪个 Mixin 定义的，调试和维护难度大（尤其在多人协作项目中）。

2. 命名冲突问题：
若 Mixin 和组件有同名 data/methods/computed，组件自身的选项会覆盖 Mixin 的选项（Vue 合并规则）；
若多个 Mixin 之间有同名选项，后引入的 Mixin 会覆盖先引入的；
冲突发生时，没有明确的报错提示，只能靠开发者手动排查，容易引发 bug。


```js
// 定义一个 Mixin（抽离公共逻辑：计数功能）
const countMixin = {
  data() {
    return {
      count: 0 // 公共数据
    }
  },
  methods: {
    increment() { // 公共方法
      this.count++
    }
  },
  mounted() { // 公共生命周期钩子
    console.log('Mixin 挂载完成，初始 count：', this.count)
  }
}

// 组件 A 引入 Mixin
export default {
  mixins: [countMixin], // 混入 countMixin
  mounted() {
    // 组件自身的钩子 + Mixin 的钩子都会执行（Mixin 钩子先执行）
    console.log('组件 A 挂载完成，count：', this.count)
  }
}

// 组件 B 引入 Mixin（复用同一套计数逻辑）
export default {
  mixins: [countMixin],
  template: `<button @click="increment">{{ count }}</button>`
}
```