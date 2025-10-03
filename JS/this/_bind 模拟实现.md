# bind 模拟实现
参考：https://github.com/mqyqingfeng/Blog/issues/12

bind 函数的两个特点：
* 返回一个函数
* 可以传入参数

bind 后返回的函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。bind传入的 this 值被忽略，同时调用时的参数被提供给模拟函数。

## 一、返回函数的模拟实现
先举个例子：

```js
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

// 返回了一个函数
var bindFoo = bar.bind(foo); 

bindFoo(); // 1
```
模拟实现：
```js
// 第一版
Function.prototype.bind2 = function (context) {   // context 为函数要绑定的对象
    var self = this;  // this 为调用 bind 的函数
    return function () {
        return self.apply(context);
    }
}
```

## 二、传参的模拟实现
疑问：我在 bind 的时候，是否可以传参呢？我在执行 bind 返回的函数的时候，可不可以传参呢？
```js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log('val: ',this.value);
    console.log('name:', name);
    console.log('age:', age);
}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// val:  1
// name: daisy
// age: 18
```
函数需要传 name 和 age 两个参数，竟然还可以在 bind 的时候，只传一个 name，在执行返回的函数的时候，再传另一个参数 age!

这可咋办？不急，我们用 arguments 进行处理：
```js
Function.prototype.bind2 = function(context){
    let self = this;
    
    // 获取 bind2 函数从第二个参数到最后一个参数 
    let args = Array.prototype.slice.call(arguments, 1)

    return function(){
        // 这个时候的arguments是指 bind 后返回函数传入的参数
        let afterBindArgs = Array.prototype.slice.call(arguments)

        return self.apply(context, args.concat(afterBindArgs))
    }
}
```

## 三、调用 bind 后创建的新函数作为构造函数

bind 后返回的函数也能使用new操作符创建对象： 即 bind 返回的函数作为构造函数的时候，bind 指定的 this 值会失效，即该this相关的属性都获取不到，但传入的参数依然生效。举个例子：
```JS
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log('val: ', this.value);
    console.log('name: ', name);
    console.log('age:', age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// val:  undefined
// name:  daisy
// age: 18

console.log('obj.habit: ', obj.habit);
console.log('obj.friend: ', obj.friend);
// obj.habit:  shopping
// obj.friend:  kevin
```
注意：尽管在全局和 foo 中都声明了 value 值，最后依然返回了 undefind，说明绑定的 this 失效了，如果大家了解 new 的模拟实现，就会知道这个时候的 this 已经指向了 obj。具体可看：[new 的模拟实现]()。

因此可通过修改返回函数的原型来实现：
```JS
// 第三版
Function.prototype.bind2 = function (context) {
    // 若调用 bind 的不是函数，则直接报错 
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
       
        // 调用 bind 后创建的新函数绑定this：
        // 1. 若不用做构造函数：直接绑定 context
        // 2. 若用做构造函数时：this 指向实例，不应该绑定在 context上，直接绑定在实例上
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }

    fBound.prototype = this.prototype;  //this为调用 bind 的函数

    return fBound;
}
```



