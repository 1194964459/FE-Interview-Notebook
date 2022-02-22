// map执行数组的forEach方法

let arr = []
let myMap = new Map();
// myMap.set('a', "zero");
// myMap.set('b', "one");
myMap.set('c', arr);


myMap.forEach(function (value, key) {
  console.log(key + " = " + value);
})

arr.push(1)
console.log('----------------')

myMap.forEach(function (value, key) {
  console.log(key + " = " + value);
})

// console.log('----------------')
// myMap.forEach(function (value) {
//   console.log(value);
// })