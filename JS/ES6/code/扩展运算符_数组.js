let arr1 = [1]
let arr2 = [2]
let arr3 = [3]

// Array.prototype.push.apply(arr1, arr2);   // 将arr2的值追加到arr1中
// console.log(arr1)  // [ 1, 2 ]

// 合并数组
arr1.concat(arr2, arr3);  // 浅拷贝
console.log(arr1.concat(arr2, arr3))  // [ 1, 2 ]


// // 拷贝数组
const arr = arr1;   // 仅仅拷贝引用
// const a2 = a1.concat();  

arr1.push(4)
console.log(arr)   // [1, 4]