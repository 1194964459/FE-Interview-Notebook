# Set 与 Map

## Set
Set类似于数组，但是成员的值都是唯一的，没有重复的值。

Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

**Set 结构的实例有以下属性**:
* Set.prototype.constructor：构造函数，默认就是Set函数。
* Set.prototype.size：返回Set实例的成员总数。

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

### 1. 操作方法:
* Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
    1. 不会发生类型转换，所以5和"5"是两个不同的值；
    2. Set 内部判断两个值是否不同，采用的算法类似于精确相等运算符（===），但是向 Set 加入值时认为NaN等于自身，而精确相等运算符===认为NaN不等于自身。
        ```JS
        set.add(NaN);
        set.add(NaN);
        set.size    // 1
        ```
    3. 两个对象总是不相等的。
        ```js
        set.add({});
        set.add({});
        set.size    // 2
        ```
* Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
* Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
* Set.prototype.clear()：清除所有成员，没有返回值。

### 2. 遍历方法：
* Set.prototype.keys()：返回键名的遍历器
* Set.prototype.values()：返回键值的遍历器
* Set.prototype.entries()：返回键值对的遍历器

Set 结构没有键名，只有键值（或者说键名和键值是同一个值）。所以keys方法和values方法的行为完全一致。entries方法返回的遍历器，同时包括键名和键值（相等），所以每次输出一个数组。

* Set.prototype.forEach()：使用回调函数遍历每个成员
* 扩展运算符（...）和for...of循环，也适用于 Set
```JS
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
    console.log(x);
}
// red
// green
// blue
```

### 3. 应用
* 使用 Set 可以很容易地实现集合的基本操作：并集（Union）、交集（Intersect）和差集（Difference）。
```JS
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

* 数组去重：
```JS
// 法1： 
Array.from(new Set(array));  // Array.from方法可以将 Set 结构转为数组。
// 法2： 
[...new Set(array)]
```

## Map

* **产生背景**：传统的JavaScript 的对象（Object），只能用字符串当作键。

即：**Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现**