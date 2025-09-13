# Vue与React中访问props、data、method

主要围绕以下4个问题来：
* Vue选项式API中data、props的数据形式
* vue选项式、组合式API中是否有this？
* Vue两种API中 如何访问data、props、method、事件之类的？
* React中state、props、method 是如何访问的？
* setup：组件实例初始化之前执行，没有this且只执行一次

参考：
[Vue2 与 Vue3 生命周期对比](https://www.doubao.com/thread/w516e5d809adbeaa5)


## 一、Vue选项式API中data、props的数据形式
### 1. data
（1）根实例（通过 new Vue() 创建的实例）的 data 可以是对象，也可以是函数。

根实例在应用中通常只被创建一次，不会像组件那样被多次复用

（2）组件中：data 必须是函数

组件可能被多次复用  
* 如果 data 是对象，所有组件实例会共享同一个对象，导致修改一个实例的状态时，其他实例的状态也会被意外修改（状态污染）。
* 而函数每次每次次调用会返回一个新的对象副本，确保每个组件实例都有独立的状态，互不影响。

### 2. props
props 本身的形式是对象或数组

唯一涉及函数的场景是：当 props 的默认值为对象或数组时，default 选项需要通过函数返回（确保每个组件实例获取独立的对象/数组副本）。

（1）数组形式：（简单声明，只指定属性名）
```js
export default {
  // 数组形式：只声明属性名
  props: ['name', 'age', 'isActive'],
  emits: ['submit', 'change']
}
```

（2）对象形式（完整配置，支持类型、校验、默认值等）  
适用于需要对接收的属性进行约束的场景，可配置 type（类型）、default（默认值）、required（是否必传）、validator（自定义校验）等。

```js
export default {
  // 对象形式：完整配置
  props: {
    name: {
      type: String, // 类型约束
      required: true // 必传
    },
    age: {
      type: Number,
      default: 18 // 默认值
    }
  }
}
```
特殊情况：props 的 default 为对象/数组时，需用函数返回。因为可能导致共享引用！
```js
export default {
  props: {
    // 错误：对象默认值直接写字面量（可能导致共享引用）
    user: {
      type: Object,
      default: { name: 'Guest' } // ❌ 不推荐
    },

    // 正确：对象/数组默认值用函数返回
    config: {
      type: Object,
      default: () => ({ theme: 'light' }) // ✅ 推荐：函数返回新对象
    },
    list: {
      type: Array,
      default: () => [1, 2, 3] // ✅ 推荐：函数返回新数组
    }
  }
}
```

## 二、选项式/组合式两种API 中是否存在this？以及如何访问data、props、method、事件之类的？
Vue 对 this 的支持分两种 API 风格：
### 1. 选项式 API（Vue2 主导，Vue3 兼容）   
在选项式 API 中，this 是核心，它始终指向当前组件实例，几乎所有操作都依赖 this：

* 访问 data 中的数据（```this.属性名```）
* 调用 methods 中的方法（```this.方法名()```）
* 访问 props（```this.prop名```）
* 触发自定义事件（```this.$emit('change')```）
* 调用组件实例的内置方法（```this.$nextTick()```）

> this.$props：访问所有 props 的对象  
> this.props：非法写法  
> this.PropName：访问单个 prop（代理后）

Vue 在初始化组件时，会将 data、props、methods 等选项中的内容「提升」到组件实例（this）上，本质是通过 Object.defineProperty（Vue2）或 Proxy（Vue3）实现的代理。

```js
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++ // 通过 this 访问 data 中的 count
      this.$emit('count-change', this.count) // 通过 this 调用 $emit
    }
  },
  mounted() {
    console.log(this.title) // 通过 this 访问 props
  },
  props: ['title']
}
```
### 2. 组合式 API（Vue3 新增）
组合式API中没有this.

组合式API的入口 setup 中也完全不能使用this，而且只执行一次：
* setup 函数中：this 是 undefined，因为 **setup 在组件实例创建前执行**，此时实例还未生成。

    但通过其他方式可以实现类似 选项式 API 中 this 的功能，setup函数格式如下：
    ```js
    setup(props, { attrs, slots, emit })
    ```
    * 访问props：```props.xxx```访问
    * 触发事件：通过 ```context.emit('event')``` 触发（替代 ```this.$emit```）。
    * 模板中若想访问，需显式返回。

* ```<script setup>```语法糖中：同样没有 this
    * 变量和方法会自动暴露给模板
    * 访问props：
        * 通过 ```defineProps 宏函数```声明组件接收的 props（**无需导入**，Vue 编译器会自动识别）。

            ```js
            <script setup>
                // 声明 props（数组形式，只指定名称）
                const props = defineProps(['title', 'count'])
            </script>

            <template>
                // 模板中直接使用 props.title、props.count
                <h1>{{ props.title }}</h1>
            </template>
            ```
        * 需注意📢：props是响应式对象，直接解构会丢失响应性，需用 ```toRefs``` 转换：
            ```js
            <script setup>
                import { toRefs } from 'vue'

                const props = defineProps(['title', 'count'])
                // 解构并保持响应性
                const { title, count } = toRefs(props)

                // 模板中可直接用 title.value、count.value（或在模板中省略 .value）
            </script>

            <template>
                <h1>{{ title }}</h1> <!-- 模板中自动解包，无需 .value -->
            </template>
            ```
    * 访问data：```ref()```、```reactive()``` 直接定义
    * 事件：通过 ```defineEmits``` 宏函数声明组件可触发的事件，然后用返回的 emit 函数触发（**无需导入**）。
    ```js
        <script setup>
            // 声明可触发的事件（数组形式）
            const emit = defineEmits(['submit', 'change'])

            // 或带校验的对象形式
            // const emit = defineEmits({
            //   submit: (value) => value.trim() !== '', // 校验：提交的值不能为空
            //   change: (id) => typeof id === 'number'
            // })

            const handleSubmit = () => {
                // 触发事件：emit(事件名, 传递的参数)
                emit('submit', '表单数据')
            }
        </script>

        <template>
            <button @click="handleSubmit">提交</button>
        </template>
    ```

## 三、React类组件中的state、props、method是怎么访问的？
### 1. State
* 初始化：状态需在 constructor 构造函数中初始化（或使用类属性语法简化）。
* 访问时通过 ```this.state.属性名``` 获取。
* 修改必须使用 this.setState() 方法（不能直接修改 this.state）。

### 2. Props
在类组件中通过 ```this.props.属性名``` 访问

### 3. method
类组件中自定义的方法，需要通过 ```this.方法名``` 调用，但**必须处理 this 指向问题**（这是 React 类组件的一个常见 “坑”）。若没绑定this，会直接报错的
```js
class Counter extends React.Component {
  state = { count: 0 };

  // 定义方法
  increment() {
    // 此处的 this 默认是 undefined，需绑定后才指向组件实例
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        {/* 这里会报错！！❌ */}
        <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}
```
### 绑定this有 4 种方法：
（1）构造函数中绑定（推荐，性能更好）
```js
constructor(props) {
    // ...  其他逻辑   
    this.increment = this.increment.bind(this)
}
// 调用时直接写：onClick={this.increment}
```

（2）使用箭头函数定义方法（箭头函数的 this 继承自父作用域）
```js
increment = () => { // 箭头函数自动绑定 this
  this.setState({ count: this.state.count + 1 });
}
// 调用时直接写：onClick={this.increment}
```

（3）JSX中绑定（❌每次 render 执行时，都会调用 bind 生成一个新的函数实例。❌）
```js
<button onClick={this.increment.bind(this)}>+1</button>
```

（4）调用时用箭头函数包裹（❌每次渲染生成新箭头函数，导致不必要的渲染❌）
```js
<button onClick={() => this.increment()}>+1</button>
```

📢注意：第3、4种方法在渲染时，都会创建新的函数，导致不必要的渲染，不是很推荐。

推荐优先使用 “constructor 中 bind” 或 “箭头函数定义方法”，避免重复创建函数，优化性能。
