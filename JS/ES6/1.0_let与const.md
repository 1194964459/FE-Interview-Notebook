# 块级作用域

### 为什么需要块级作用域？
ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

* 用来计数的循环变量泄露为全局变量。
* 内层变量可能会覆盖外层变量；
```JS
var tmp = new Date();

function f() {
  console.log(tmp);  
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```
函数 f 内部会形成一个函数作用域，if 内声明了一个变量，会提升到函数作用域顶部，所以此处不是输出外层的 temp = new Date(), 而是undefined。


### 块级作用域·特点：
1. 不存在'变量提升'；
    变量提升指的是：变量可以在声明之前使用；
2. 暂时性死区:
    只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

```javascript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

3. 不允许重复声明；
```javascript
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```
