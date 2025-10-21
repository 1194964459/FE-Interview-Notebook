## Iterator
迭代器对象：有next方法的一个对象，且 next() 方法的返回值是形如{ value: any, done: boolean } 的对象
Iterator 接口： 一个对象只要部署了 Symbol.iterator 属性，就称它为 “可迭代对象”。（该属性是一个遍历器生成函数，调用后会返回一个遍历器对象）


### 背景：
JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。这四种数据集合，可嵌套组合使用，比较混乱，缺乏一种统一的接口机制。

### 作用：
Iterator 的作用有三个：
* 为各种数据结构，提供一个**统一的、简便的访问接口**；
* 使得数据结构的成员能够**按某种次序排列**；
* ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

### 遍历：
Iterator 的遍历过程是这样的：
1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
```javascript
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

## 默认 Iterator 接口 
* 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
* ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性
* Symbol.iterator属性本身是一个遍历器生成函数，该函数返回一个遍历器对象。

```javascript
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```


ES6 的有些数据结构原生具备 Iterator 接口，即不用任何处理，就可以被for...of循环遍历；另外一些数据结构没有（比如对象）。都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。

<br/>

**原生具备 Iterator 接口的数据结构如下：**
* Array
* Map
* Set
* String
* TypedArray
* 函数的 arguments 对象
* NodeList 对象

<br/>

下面的例子是数组的Symbol.iterator属性。
```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

<br/>
类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。

```javascript
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

[...document.querySelectorAll('div')] // 可以执行了
```

<br/>

**只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。**

```javascript
let arr = [...iterable];

// 示例
var str = 'hello';
[...str] //  ['h','e','l','l','o']
```
### 数组
JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6 提供for...of循环，允许遍历获得键值。
* for...of循环调用遍历器接口，数组的遍历器接口**只返回具有数字索引的属性**。这一点跟for...in循环也不一样。

```javascript
let arr = [3, 5, 7];
arr.foo = 'hello';

// for..in
for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

// for..of
for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
// for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。
```

### Set与Map
Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用for...of循环。两者都是按照各个成员被添加进数据结构的顺序进行遍历。
* Set 结构遍历时，返回的是一个值；
* Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。

```javascript
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
  console.log(pair);
}
// ['a', 1]
// ['b', 2]

for (let [key, value] of map) {
  console.log(key + ' : ' + value);
}
// a : 1
// b : 2
```

### 计算生成的数据结构
有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。

* entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。
* keys() 返回一个遍历器对象，用来遍历所有的键名。
* values() 返回一个遍历器对象，用来遍历所有的键值。
这三个方法调用后生成的遍历器对象，所遍历的都是计算生成的数据结构。

```javascript
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

### 类数组对象
并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。

### 对象
* 对于普通的对象，可以用for...in循环遍历键名。
* for...of结构不能直接使用，会报错

### 与其他遍历语法比较

* forEach：无法中途跳出forEach循环，break命令或return命令都不能奏效。

* for...in 循环可以遍历数组的键名。
**缺点：**
    > 1. 数组的键名是数字，但是for...in循环是以**字符串作为键名**“0”、“1”、“2”等等。
    > 2. for...in循环不仅 遍历数字键名，还会遍历**手动添加其他键，甚至包括原型链上的键**。
    > 3. 某些情况下，for...in循环会以任意**顺序**遍历键名。
    总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。

* for...of：
    > 1. 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
    > 2. 不同于forEach方法，它可以与break、continue和return配合使用。
    > 3. 提供了遍历所有数据结构的统一操作接口。



### 待查看  补充：
对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
```js
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

