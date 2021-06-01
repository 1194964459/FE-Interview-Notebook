参看掘金：[call,apply,bind](https://juejin.cn/post/6844903906279964686)

### 目录
* call,apply,bind的基本介绍
* call/apply/bind的核心理念：借用方法
* call和apply的应用场景
* bind的应用场景
* 中高级面试题：手写call/apply、bind

## 基本介绍
1. 语法
```javascript
fun.call(thisArg, param1, param2, ...)
fun.apply(thisArg, [param1,param2,...])  //第二个参数是数组/类数组,apply是以a开头，array；
fun.bind(thisArg, param1, param2, ...)
```
这三函数主要是为：改变函数执行时的this指向，fun的this指向thisArg对象。
> 1. 非严格模式下：thisArg指定为null，undefined，fun中的this指向window对象.
> 2. 严格模式下：fun的this为undefined
> 3. 值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象，如 String、Number、Boolean

注意：调用call/apply/bind的必须是个函数；

2. 返回值
* call/apply：返回fun执行的结果； 
* bind：返回fun的拷贝，并拥有指定的this值和初始参数

3. call, apply, bind的核心概念：借用方法
借助已实现的方法，改变方法中数据的this指向，减少重复代码，节省内存。

## call, apply 应用场景

## bind 应用场景

## 手写 call

## 手写 apply

## 手写 bind