参看掘金：[call,apply,bind](https://juejin.cn/post/6844903906279964686)

## 基本介绍
这三者都是用来改变 this 指向的，即改变函数执行时的上下文。

**为什么要改变执行上下文？**
> A 对象有一个方法，而 B 对象因为某种原因，也需要用到同样的方法，那么这时候我们是单独为 B 对象扩展一个方法呢，还是借用一下 A 对象的方法呢？当然是借用 A 对象的啦，既完成了需求，又减少了内存的占用。

**1. 语法**
```javascript
// fun的this指向thisArg对象
fun.call(thisArg, param1, param2, ...)
fun.apply(thisArg, [param1,param2,...])  //第二个参数是数组/类数组,apply是以a开头，array；
fun.bind(thisArg, param1, param2, ...)
```
这三个函数中 第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

**2. 返回值**
* call/apply：返回fun执行的结果； 
* bind：返回fun的拷贝（新函数），并拥有指定的this值和初始参数

**3. 细节注意：**
* 调用call/apply/bind的必须是个函数；
* 非严格模式下：thisArg 指定为null，undefined，fun 中的 this 指向window对象.
* 严格模式下：fun 的 this 为undefined
* 值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象，如 String、Number、Boolean


## call 的使用场景
call 一般在对象的继承、借用方法 时使用

* 对象的继承
```JS
function superClass () {
    this.a = 1;
    this.print = function () {
        console.log(this.a);
    }
}

function subClass () {
    superClass.call(this);
    this.print();
}

subClass();
// 1
```

* 借用方法
如类数组，如果它想使用 Array 原型链上的方法，可以这样：
```JS
let domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));
```

## apply 的使用场景
* Math.max, 用它来获取数组中最大的一项。
```JS
// 获得数组的最大项
let max = Math.max.apply(null, array);

// 获得数组的最小项
let min = Math.min.apply(null, array)
```