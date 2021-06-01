## 作用域
JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。

1. 词法作用域：函数的作用域在'函数定义'的时候就决定了；
2. 动态作用域：函数的作用域是在'函数调用'的时候才决定的，是与'词法作用域'相对的一种作用域。

```javascript
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// 结果是 ???
```

1. 若采用'静态作用域'：执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，'就根据书写的位置'，查找上面一层的代码，也就是 value 等于 1，所以结果'会打印 1'。
2. 若采用'动态作用域'：执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就'从调用函数的作用域'，也就是 bar 函数内部查找 value 变量，所以结果'会打印 2'。

