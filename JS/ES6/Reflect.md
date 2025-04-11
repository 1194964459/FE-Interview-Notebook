# Reflect

有了Reflect对象以后，很多操作会更易读。 TODO:为什么？
```js
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

```js
// TODO:这个是啥意思？
Object.freeze({})
```


```js
// 将原型方法转化为普通方法：
// 法1:
const slice = Array.prototype.slice;
slice.call(arguments);   // 调用时必须得传入待设定的this

// 法2：
const unboundSlice = Array.prototype.slice;
const slice = Function.prototype.call.bind(unboundSlice);    // TODO:call.bind()  // 只要是函数，就可调用bind、call、apply等方法！
slice(arguments);   // bind 一个this对象后，作为普通函数调用！
```

