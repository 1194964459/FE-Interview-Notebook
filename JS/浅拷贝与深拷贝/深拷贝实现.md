深拷贝的坑：
https://juejin.cn/post/6844903621021138957

https://juejin.cn/post/6844904197595332622

https://juejin.cn/post/6844903929705136141

代码实现：
https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js


在Javascript中一共只有以下7种数据类型：
* Number
* String
* Boolean
* Null
* Undefined
* Symbol
* Object

前面6种类型是原始数据类型，而Object是引用数据类型。通常也把前面6种称之为简单数据类型，而把Object称之为复杂数据类型。复杂数据类型还有子类型，比如Array,Function,RegExp,Date等对象。


浅拷贝： 如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以修改新拷贝的对象会影响原对象。

## 一、浅拷贝样例：./code/浅拷贝.js

```js
// 数组拷贝
var arr = ['a', 'b', 'c'];

// 浅拷贝
var arr2 = arr 

/**
 * slice、concat（创建新数组，不会改变原数组） 
 * 
 * 1. 若数组元素是字符串、数字、布尔值时，修改 数组A 不会影响到 数组B；
 * 2. 若数组元素是个对象引用（不是实际的对象），slice 会拷贝这个对象引用到新的数组里。修改其中一方，另一方也会改变
 */ 
var arrCopy = arr.slice(0);  // ["a", "b", "c"]
arrCopy[0] = 'test'

var arrCopy = arr.concat();  // ["a", "b", "c"]
```

## 二、深拷贝实现
### 1. 序列化与反序列化
JSON.parse(JSON.stringify)实现了一个深拷贝。

JSON只支持object,array,string,number,true,false,null这几种数据或者值（即：5种基本类型中除了undefined都支持，复杂类型中支持object、array两种），

其他的比如函数、undefined、Date、RegExp等数据类型都不支持。对于它不支持的数据都会直接忽略该属性。

 * 值为undefined 或 函数，会被忽略；
 * 值为NaN、Infinity，会转为null；
 * 值为正则，转为一个空对象；
 * 值为Date对象，转为字符串；
 * 循环引用（属性值指向自身），报错


  * 丢失特殊对象：无法处理Date（转为字符串）、RegExp（转为空对象）、Map、Set、函数等。
  undefined、symbol、函数会被直接忽略
  循环引用（属性值指向自身），报错
  丢失不可枚举属性：无法复制enumerable: false的属性。

```js
// 全部符合预期
const obj = {
    nan:NaN,
    infinityMax:1.7976931348623157E+10308,
    infinityMin:-1.7976931348623157E+10308,
    undef: undefined,
    fun: () => { console.log('叽里呱啦，阿巴阿巴') },
    date:new Date,
}
```    

### 2. 数组、对象深拷贝
```js
function deepClone(target) {
  if (target instanceof Object) {
    let dist = target instanceof Array ? [] : {}
    for (let key in target) {
      // 递归调用自己获取到每个值
      dist[key] = deepClone(target[key]);
    }
    return dist;
  } else {
    return target;
  }
}
```

### 3. 函数 深拷贝
拷贝函数这个其实有点争议，因为在很多人看来函数是无法拷贝的。因此本质上是实现函数的功能 且函数对象的属性要符合深拷贝逻辑。

两大功能需具备：
* 函数实现的功能要相同——返回的值相同
* 函数身上的引用类型的属性要不相同，直接类型的属性的值要相同

```js
function deepClone(target) {
  if (target instanceof Object) {
    let dist
    if (target instanceof Array) {
      dist = []
    } else if (target instanceof Function) {
      dist = function () {
        return target.call(this, ...arguments)
      }
    } else {
      dist = {}
    }
    for (let key in target) {
      dist[key] = deepClone(target[key])
    }
    return dist;
  } else {
    return target;
  }
}
```

### 4. 正则表达式 深拷贝
```js
const a = /hi\d/ig;
```
一个正则，其实由两部分组成，正则的模式（斜杠之间的内容）hi\d,以及参数ig。因此，只要能够拿到这两部分就可以得到一个正则表达式。

通过正则的 source、flags属性可拿到：

```js
const a = /hi\d/ig;
console.log(a.source);   //   hi\d
console.log(a.flags)    // ig
```

```js
function deepClone(target) {
  if (target instanceof Object) {
    let dist;
    if (target instanceof RegExp) {
      // 拷贝正则表达式
      dist = new RegExp(target.source, target.flags);
    }
    return dist;
  } else {
    return target;
  }
}
```

### 5. 日期 深拷贝
通过我们上面的方法拷贝后，返回的是一个字符串。这个字符串不是Date类型的， 它无法调用Date的任何方法。

事实上，通过上面的Array,Function,RexExp复杂对象类型的拷贝，我们可以发现，实际上这些拷贝都是通过new XXX()，相当于创建一个新的对象返回回去。因此，日期的拷贝也是一样：

```js
dist = new Date(source);
```

因此，最终的完整版为：
```js

function deepClone(target){
  if(target instanceof Object){
      let dist ;
      if(target instanceof Array){
        // 拷贝数组
        dist = [];
      }else if(target instanceof Function){
        // 拷贝函数
        dist = function () {
          return target.call(this, ...arguments);
        };
      }else if(target instanceof RegExp){
        // 拷贝正则表达式
       dist = new RegExp(target.source,target.flags);
      }else if(target instanceof Date){
          dist = new Date(target);
      }else{
        // 拷贝普通对象
        dist = {};
      }
      for(let key in target){
          dist[key] = deepClone(target[key]);
      }
      return dist;
  }else{
      return target;
  }
}
```

## 深拷贝优化

### 1. 忽略原型属性，仅考虑自身属性
```js
  for (let key in source) {
    // 只遍历本身的属性
    if(source.hasOwnProperty(key)){
      dist[key] = deepClone(source[key]);
    }
  }
```
### 2. 环状对象爆栈问题
如果一个对象有属性指向自身，那么就会形成一个环。这样的话，在进行递归调用的过程中会无限循环，最终爆栈。

```js
let a = {name:"小明"};
a.self = a;   // a的self属性指向a
```
因此，我们需要添加递归终止条件。所谓的递归终止条件，就是判断一个对象是否已经被克隆过了，如果被克隆过了那么就直接使用克隆后的对象(用map)，不再进行递归。

循环引用的几种格式：
```js
const objA = {};
const objB = { a: objA };
objA.b = objB; // 形成循环：objA.b.b.b... 无限嵌套

console.log(objA); // 不会报错，但在控制台可能显示为 "[Circular]"
```
