# Array.from()、Array.of()、Array()、new Array()、扩展运算符 五者比较
参考：
* [Array.of()与Array.from()](./1.4_Array%20of%20与%20Array%20from.md)
* [ES6中扩展数组方法](../ES6/5.1_扩展与新增_数组.md)

## Array.of()
Array.of()基本上可以用来替代Array()或new Array()；
这3个都是用来**创建数组**的。Array.of()在创建数组时，无论传入多少个参数，都会将每个参数作为数组的一个元素。但是Array()如果参数只有一个时，会创建一个数组长度为参数的数组。

```javascript
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

## 兼容旧环境：
如果原生不支持的话，在其他代码之前执行以下代码会创建 Array.of()：
```javascript
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}
```

## Array.from()
Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

专门用于 “转换” 而非 “直接创建”。

* Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```JS
Array.from(arrayLike, x => x * x);

// 等同于
Array.from(arrayLike).map(x => x * x);
```

## 疑问：扩展运算符，Array.from都可以将某些结构转为数组，两个有啥区别**？
* 扩展运算符背后调用的是迭代器 接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。
* Array.from 除了支持迭代器 接口，还支持类数组对象（必须有length属性）。


## 扩展运算符
参考：[扩展运算符](../ES6/2.1_扩展运算符与rest参数.md)

主要是替代函数的 apply 方法

```js
var args = [0, 1, 2];
f.apply(null, args);
f(...args);
```