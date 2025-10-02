# 立即执行函数（IIFE）
立即执行函数的几种形式：
* `(function(){})()`
* `((function(){})())`
* 使用**一元运算符（如 !、~、+、- 等）或 void 操作符**来强制函数表达式的立即执行。如：`!function(){}()`。

注意：`function(){}()`不是立即执行函数哦，直接运行会抛出语法错误 `SyntaxError: Unexpected token ')'`。


### 立即执行函数如何传参？
```js
// 定义时声明参数，执行时传入实参
(function(形参1, 形参2, ...) {
  // 函数体中使用参数
})(实参1, 实参2, ...);
```

### 立即执行函数有什么作用？
答：模块化、创建局部作用域、循环/异步中捕获变量的当前值

1. 创建私有作用域，避免全局污染
```js
(function() {
  let privateVar = "我是私有变量";
  console.log(privateVar); // 正常访问
})();

console.log(privateVar); // 报错：privateVar is not defined（外部无法访问）
```
2. 在循环、异步操作中，捕获变量的当前值（ES6 前常用，现在可被 let/const 替代）。
```js
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(() => {
      console.log(index); // 依次输出 0、1、2（正确捕获每次循环的i值）
    }, 100);
  })(i); // 传入当前i作为参数
}
```
3. 没有 ES6 模块（import/export）时，IIFE 常用来实现模块化，暴露特定接口。
```js
const module = (function() {
  let count = 0; // 私有变量
  
  return {
    increment: () => count++,
    getCount: () => count
  };
})();

module.increment();
console.log(module.getCount()); // 输出：1（只能通过暴露的方法访问）
```
需注意：IIFE 执行后无法再次调用（没有函数名，除非主动赋值给变量）。

