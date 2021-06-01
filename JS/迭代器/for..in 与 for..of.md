## for..in 与 for..of

* 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。
* for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。


### 对数组而言：
* JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6 提供for...of循环，允许遍历获得键值。
* for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。

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