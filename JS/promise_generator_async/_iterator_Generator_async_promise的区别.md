# iterator、Generator、async/await 与  promise的区别

## Iterator（迭代器）
    * 为各种数据结构，提供一个**统一的、简便的 for..of 访问接口**；
    * 使得数据结构的成员能够**按某种次序排列**；

迭代器是一个有**next方法**的对象，且 next() 方法的返回值是形如{ value: any, done: boolean } 的对象

一个对象只要部署了 Symbol.iterator 属性，就称它为 “可迭代对象”。（该属性是一个遍历器生成函数，调用后会返回一个遍历器对象）

## Generator
* 是一个状态机，封装了多个内部状态，支持暂停/恢复（可手动控制执行流程）。
    > yield 实现暂停，next() 实现恢复。
* 是一个遍历器对象生成函数。调用后会返回一个遍历器对象(Iterator Object)，可以依次遍历 Generator 函数内部的每一个状态。

**Generator 函数的两个特征**：
* function关键字与函数名之间有一个星号；
* 函数体内部使用 **yield 表达式，定义不同的内部状态**。
```js
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();
```

## Promise
一个容器，存储异步操作的 状态和结果，可以解决“回调地狱”。

* 异步操作主要有三种状态（pending、fulfilled、rejected 失败），状态一旦改变不可逆转。
* 支持链式调用，then() 接收成功结果，catch() 捕获错误；
* 本身无法暂停，一旦创建立即执行，


## async/await（异步最优解）
是 Promise 和 Generator 自动执行器的 语法糖，让异步代码呈现 “同步结构”

async 函数本质是返回 Promise 的普通函数，await 本质是 “自动调用 Generator 的 next() 并处理 Promise 状态”。