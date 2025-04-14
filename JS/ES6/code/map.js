// map执行数组的forEach方法

// let arr = []
// let myMap = new Map();
// // myMap.set('a', "zero");
// // myMap.set('b', "one");
// myMap.set('c', arr);


// myMap.forEach(function (value, key) {
//   console.log(key + " = " + value);
// })

// arr.push(1)
// console.log('----------------')

// myMap.forEach(function (value, key) {
//   console.log(key + " = " + value);
// })

// console.log('----------------')
// myMap.forEach(function (value) {
//   console.log(value);
// })

/*
* Map 与数组对象的关系
*/
const kvArray = [
  ["key1", "value1"],
  ["key2", "value2"],
];

// 使用常规的 Map 构造函数可以将一个二维的键值对数组转换成一个 Map 对象
const myMap = new Map(kvArray);

console.log(myMap.get("key1")); // "value1"

// 使用 Array.from 函数可以将一个 Map 对象转换成一个二维的键值对数组
console.log(Array.from(myMap)); // 输出和 kvArray 相同的数组

// 更简洁的方法来做如上同样的事情，使用展开运算符
console.log([...myMap]);

// 或者在键或者值的迭代器上使用 Array.from，进而得到只含有键或者值的数组
console.log(myMap.keys());  // [Map Iterator] { 'key1', 'key2' }
console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]

