# Vue中如何使用 TS?

## 一、为组件的props、emits 标注类型
props、emit 几种常见的约定方式：

* 想要快速声明 → 用运行时；
* 想要运行时校验参数合法性 → 用基于选项；
* 想要TS **类型提示** → 用基于类型。

**1. 运行时**
```js
const emit = defineEmits(['change', 'update'])
```
只声明事件名称，**不约束事件的参数类型和合法性**。 

假如*传入了不符合逻辑类型的参数*，但代码不会在**编译阶段**报错，也不会在**运行时**进行参数校验，依然可以触发事件执行相关逻辑。

**2. 基于选项**  
给defineEmits函数的参数 定义类型
```js
const emit = defineEmits({
  change: (id: number) => {
    // 返回 true/false，验证参数是否合法
    return id > 0; 
  },
  update: (value: string) => {
    return value.length > 0;
  }
})
```
定义了事件触发时的参数校验函数。主要校验2个：参数**类型**、参数**合法性**。
校验函数返回true 表示参数合法，false 表示不合法（不合法时事件不会触发，Vue 会警告）。
何时校验？**函数真正运行的时候校验**。

**3. 基于类型（依赖 TypeScript）**   
```js
// 写法 1（Vue 3.3 前）
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 写法 2（Vue 3.3+ 更简洁）
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
```
通过 **TypeScript 泛型**声明事件的**名称和参数类型**，只做**类型校验**（编译时检查），不影响运行时逻辑。


### 示例

假设组件要触发 change 事件，要求参数 id 是正数：

* 运行时：defineEmits(['change']) → 父组件可以传任何类型（如 emit('change', 'abc')），不报错但逻辑错。
* 基于选项：defineEmits({ change: (id: number) => id > 0 }) → 父组件传 emit('change', -1) 时，**Vue 会警告，且事件不触发**。
* 基于类型：defineEmits<{ change: [id: number] }>() → 父组件传 emit('change', 'abc') 时，TS 编译阶段就会报错（类型不匹配）。


## 二、为 ref() 标注类型
有3种方式，更推荐”泛型函数“的写法！

1. 不指定类型，但设置了初始值，根据初始值进行类型推导！后期使用时，若类型不一致会报错!
2. 通过使用 Ref 这个类型：（泛型接口）
    * 显式指定变量类型：```Ref<string | number>```
    * ref 函数的基于初始值的类型推断会被忽略
    ```js
    import { ref } from 'vue'
    import type { Ref } from 'vue'

    const year: Ref<string | number> = ref('2020')

    year.value = 2020 // 成功！
    ```

3. 调用 ref() 时传入一个泛型参数，来覆盖默认的推导行为：（**泛型函数**）
    ```js
    // 得到的类型：Ref<string | number>
    const year = ref<string | number>('2020')

    year.value = 2020 // 成功！
    ```
    * ref 是一个泛型函数，```<string | number>```用于指定其返回值的类型（即 ```Ref<string | number>```）。
    * 变量 year 的类型会自动从 ref 函数的返回值类型自动推断而来，无需额外声明。
    * 更符合 TypeScript 的 “类型推断优先” 原则，代码更简洁，比较推荐。


## 三、其他reactive、computed等的类型写法，与ref差不多

## 四、TS不认识 .vue文件，怎么搞？
新增 shims-vue.d.ts文件（Vue 3 项目中 通常自动生成），内容如下：
```js
declare module '*.vue' {  // 声明一个模块，该模块是以 .vue 结尾的文件；
  import type { DefineComponent } from 'vue'   // 模块中导入 DefineComponent 类型。
  const component: DefineComponent<{ }, { }, any>
  export default component  // 表示每个 .vue 文件的默认导出（即组件本身）的类型是 component
}
```

其中`const component: DefineComponent<{ }, { }, any>`，定义一个名为 component 的变量，类型是 DefineComponent，并通过泛型参数指定组件的细节：
* 第一个泛型参数（{}）：组件 **props** 的类型（这里留空 {}，表示没有 props 或 props 类型自动推断）。
* 第二个泛型参数（{}）：组件 **data** 的类型
* 第三个泛型参数（any）：**组件的其他选项**（如 methods、computed 等）的类型

