# Generator

* 简介
* next 方法的参数
* for...of 循环
* Generator.prototype.throw()
* Generator.prototype.return()
* next()、throw()、return() 的共同点
* yield* 表达式
* 作为对象属性的 Generator 函数
* Generator 函数的this
* 含义
* 应用


## 简介
**Generator 函数**：
* 是一个状态机，封装了多个内部状态。
* 是一个遍历器对象生成函数。返回的遍历器对象(Iterator Object)，可以依次遍历 Generator 函数内部的每一个状态。

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
上面代码中它内部有两个yield表达式（hello和world），即该函数有三个状态：hello，world 和 return 语句（结束执行）。


调用遍历器对象的next方法，使得指针移向下一个状态。Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

```JS
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```
上面代码一共调用了四次next方法。







## next 方法的参数
## for...of 循环
## Generator.prototype.throw()
## Generator.prototype.return()
## next()、throw()、return() 的共同点
## yield* 表达式
## 作为对象属性的 Generator 函数
## Generator 函数的this
## 含义
## 应用