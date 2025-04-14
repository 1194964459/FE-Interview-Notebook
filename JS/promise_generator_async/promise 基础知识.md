# Promise 对象
主要内容有：
* Promise 含义
* Promise 使用
* Promise.prototype.then()
* Promise.prototype.catch()
* Promise.prototype.finally()
* Promise.all()
* Promise.race()
* Promise.allSettled()
* Promise.any()
* Promise.resolve()
* Promise.reject()
* Promise.try()


## 1. promise 含义：

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

## 2. promise 使用：
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

## 3. Promise.prototype.then()

* then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

* 采用**链式的then**，可以指定一组按照次序调用的回调函数。在**后面的 then 会等待前面 promise对象 状态的 改变**，才会被调用。

* **then方法的回调函数**，**第一个回调函数完成以后**，会**将返回结果**（普通值 或 promise对象）**作为参数**，**传入**第二个回调函数。

## 4. Promise.prototype.catch()

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

## 5. Promise.prototype.finally()
* finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
* 换种说法就是：finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
* finally本质上是then方法的特例。
```javascript
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```
* Promise.prototype.finally 的基本实现：
```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```
不管前面的 Promise 是fulfilled还是rejected，都会执行回调函数callback。

## 6. Promise.all()
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
```javascript
const p = Promise.all([p1, p2, p3]);
```
* p1、p2、p3都是 Promise 实例，若不是的话，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例。
* Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
* p的状态由p1、p2、p3决定，分成两种情况:

>（1）**只有**p1、p2、p3的状态**都变成fulfilled**，p的状态才会变成fulfilled，此时**p1、p2、p3的返回值组成一个数组**，传递给p的回调函数。

>（2）**只要**p1、p2、p3之中**有一个被rejected**，p的状态就变成rejected，此时**第一个被reject的实例的返回值**，会传递给p的回调函数。

* 注意：如果作为参数的 **Promise 实例，自己定义了catch方法**，那么它一旦被rejected，并**不会触发Promise.all()的catch方法**。

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```
p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例(catch返回的实例)。该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的**两个实例都会resolved**，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

## 7. Promise.race()
Promise.race() 与 Promise.all()方法类似，都是将多个 Promise 实例，包装成一个新的 Promise 实例。
```javascript
const p = Promise.race([p1, p2, p3]);
```
**区别在于：只要**p1、p2、p3之中**有一个实例率先改变状态，p的状态就跟着改变**。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。（race 的中文含义是‘比赛’）

示例：
```javascript
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```
如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

## 8. Promise.allSettled()
用来确定一组操作是否全部结束？（不管成功或失败）

TODO:疑问 await到底是个啥？返回的是个promise吗？await后面的请求 异步顺序？

* Promise.allSettled() 与 Promise.race()、Promise.all()方法类似，都是将多个 Promise 实例，包装成一个新的 Promise 实例。
* 有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，Promise.allSettled()方法就很有用。

```javascript
const p = Promise.allSettled([p1, p2, p3]);
```

* **区别在于：只有**等到**所有这些参数实例都返回结果**，**不管是fulfilled还是rejected**，包装实例才会结束。该方法由 ES2020 引入。（allSettled 的中文含义是‘所有的 都设置’）
* 该方法返回的新的 Promise 实例，一旦结束，状态总是fulfilled，不会变成rejected。
* **Promise 的监听(回调）函数接收到的参数**是一个数组，每个成员对应一个传入Promise.allSettled()的 Promise 实例。
> 1. 每个对象都有**status属性**，该属性的值只可能是**字符串fulfilled**或**字符串rejected**。
> 2. fulfilled 时，对象有value属性，
> 3. rejected 时， 有reason属性，对应两种状态的返回值。


```javascript
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

// results 与 allSettled() 参数中的 Promise 实例对应
allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

## 9. Promise.any()
* Promise.any() 与 Promise.allSettled()、Promise.race()、Promise.all()方法类似，都是将多个 Promise 实例，包装成一个新的 Promise 实例。
* **只要**参数实例**有一个变成fulfilled状态**，包装实例就会变成 **fulfilled** 状态；
* 如果**所有参数实例 都变成rejected状态**，包装实例就会变成 **rejected** 状态。
* 与Promise.race()方法很像，只有一点不同，就是**不会因为某个 Promise 变成rejected状态而结束**。

## 10. Promise.resolve()
将现有对象转为 Promise 对象。

Promise.resolve()等价于下面的写法：
```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

Promise.resolve() 方法的参数分成四种情况：

（1）参数是一个 Promise 实例

Promise.resolve将不做任何修改、原封不动地返回这个实例。

（2）参数是一个 **thenable 对象**（具有then方法的对象）
```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});
```
上面代码中，**thenable对象的then()方法执行后**，**对象p1的状态**就变为resolved。然后再执行 p1 的 then()方法指定的回调函数，输出42。

（3）参数是一个**原始值**，或者是一个**不具有then()方法的对象**
```javascript
const p = Promise.resolve('Hello');

p.then(function (s) {
  console.log(s)
});
// Hello
```
Promise.resolve()方法的参数，会同时传给回调函数。

（4）不带有任何参数
Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

需要注意的是，立即resolve()的 Promise 对象，是在**本轮“事件循环”（event loop）的结束时**执行，而**不是在下一轮“事件循环”的开始时**。

```javascript
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。

## 11. Promise.reject()
Promise.reject(**reason**)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续 rejected 回调方法的参数。

```javascript
Promise.reject('出错了')
.catch(e => {
  console.log(e === '出错了')
})
// true
```

上面代码中，Promise.reject()方法的参数是一个字符串，后面catch()方法的参数e就是这个字符串。

## 12. Promise.try()
具体没看，未完待续...




