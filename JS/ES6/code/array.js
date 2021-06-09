// function push(array, ...items) {
//     console.log(items)
//     let b = array.push(...items);
//     console.log('b： ', b)
// }
// let a = [1]
// push(a, [2,3,4])

// 将一个数组添加到另一个数组
// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// Array.prototype.push.apply(arr1, arr2);

// console.log('arr1: ', arr1)


// 合并数组
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]
console.log('arr: ', arr1)
console.log(arr1.concat(arr2, arr3))
// ES6 的合并数组
// [...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
