# promise 相关介绍

## promise 含义：

**1. Promise对象有以下两个特点**：

**（1）对象的状态不受外界影响**。
> 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

> Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

**（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果**。
> Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。

> 如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

**2. Promise 缺点：**

（1）**无法取消Promise**，一旦新建它就会立即执行，无法中途取消。

（2）如果不设置回调函数，**Promise内部抛出的错误**，不会反应到外部。

（3）当处于**pending状态**时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## promise 使用：
下面代码创造了一个Promise实例:
```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

resolve(), reject() 修改Promise对象状态；

Promise状态改变后执行对应的回调！

**示例2：resolve返回一个Promise对象**
```javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```
由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。

## Promise.prototype.then()

* then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

* 采用链式的then，可以指定一组按照次序调用的回调函数。在后面的 then 会等待前面 promise对象 状态的 改变，才会被调用。

* then方法的回调函数，第一个回调函数完成以后，会将返回结果（普通值 或 promise对象）作为参数，传入第二个回调函数。

## Promise.prototype.catch()

* Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

* Promise对象的错误、及then()回调函数 中抛出的错误，都会被catch()方法捕获。

* reject()方法的作用，等同于抛出错误。下面几种方法是等价的
```javascript
// 法1：
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});

// 法2：
const promise = new Promise(function(resolve, reject){
    try{
        throw new Error('test')
    }catch(error){
        reject(error)
    }
})

// 法3：
const promise = new Promise(function(resolve, reject){
    reject(new Error('test'))
})

// 公共的异常捕获处理
promise.catch(function(error) {
  console.log(error);
});
// Error: test
```

* Promise 的状态一旦改变，就永久保持该状态，此时再抛出错误是无效的。

```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
```
因此，该错误不会被捕获。

* 一般来说，不要在then()方法里面定义 Reject 状态的回调函数（即then的第二个参数），用catch方法比较好。因为可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。

* 跟传统的try/catch代码块不同的是，如果没有使用catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码。         这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

```javascript
const someAsyncThing = function() {
return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
});
};

someAsyncThing().then(function() {
console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
//   Uncaught (in promise) ReferenceError: x is not defined
//   123
```
解析someAsyncThing()函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。

## Promise.prototype.finally()
finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。