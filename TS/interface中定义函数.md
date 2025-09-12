# interface中定义函数

interface中可以有多种类型：基本属性（字符串、数值等）、对象、函数等。

其中函数有2种：
* 具名函数
* 匿名函数

## 一、具名函数：函数是作为 interface的某个属性 被定义

示例1：定义了一个对象，函数是其中的一个属性
```js
// 只包含一个具名函数的接口
interface MathOperation {
  calculate(a: number, b: number): number;
}

// 实现（作为对象的方法）
const adder: MathOperation = {
  calculate: (a, b) => a + b,
};
```

## 二、匿名函数：interface是函数类型类型接口

分2种情况：  
* 函数类型接口：interface 中若只有一个匿名函数（函数类型接口），语法：```interface 接口名 { (参数列表): 返回值类型 }```
* 混合类型接口（函数+其他类型）：除了匿名函数外，还包含了其他属性

### 示例1：描述 “输入输出类型一致” 的函数

```js
// 匿名函数接口：没有函数名，直接定义函数签名
interface Transformer<T> {
  (value: T): T; // 函数接收 T 类型参数，返回 T 类型值
}

// 用接口约束具体函数（无需函数名，直接匹配签名）
const double: Transformer<number> = (num) => num * 2; // 符合：number → number
const toUpper: Transformer<string> = (str) => str.toUpperCase(); // 符合：string → string
```
Transformer 直接定义了一个函数类型，而不是对象。

### 示例2：混合类型接口（函数 + 其他类型）

interface 中除了匿名函数外，还包含了其他属性

```js
// 混合类型接口：既是函数，又有属性
interface Counter {
  // 函数签名（匿名）
  (): number;
  // 额外属性
  count: number;
  // 额外方法
  reset(): void;
}

// 实现：创建一个可调用的对象
const createCounter = (): Counter => {
  const counter = () => {
    counter.count++;
    return counter.count;
  };
  counter.count = 0;
  counter.reset = () => {
    counter.count = 0;
  };
  return counter;
};

// 使用
const counter = createCounter();
counter(); // 1（调用函数）
counter(); // 2
console.log(counter.count); // 2（访问属性）
counter.reset(); // 调用方法
counter.count; // 0
```
