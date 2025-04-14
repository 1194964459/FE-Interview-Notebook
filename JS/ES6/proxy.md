# proxy

## 概述
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 用于修改某些操作的默认行为。

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
```js
var proxy = new Proxy(target, handler);
```
target参数表示所要拦截的目标对象；handler参数也是一个对象，用来定制拦截行为。

```js
// example
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});

obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```

如果handler没有设置任何拦截，那就等同于直接通向原对象。

```js
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';   // handler为空对象，访问proxy就等同于访问target。
target.a // "b"
```
<!-- TODO:疑问❓ -->
Object.create
对象 ... in ... , 对象的has()


## proxy实例方法

* get()
  > get()方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

* set()
  
* apply()：
  > 拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

* has()：
  > 拦截propKey in proxy的操作，返回一个布尔值。

* construct()：
  > 拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
  
* deleteProperty()
* defineProperty()
* getOwnPropertyDescriptor()
* setPrototypeOf()
* getPrototypeOf()
* isExtensible()
* ownKeys()
* preventExtensions()
