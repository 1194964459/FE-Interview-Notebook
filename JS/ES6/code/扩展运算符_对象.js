/**
 * Object.assign 与 扩展运算符...
 */

// 1. 扩展运算符
let a = { a: 1 }
let b = { b: 2 }
// let c = { ...a, ...b }   // 等同于：let c = Object.assign({}, a, b);
// console.log(a)  // { a: 1 }


// 2. Object.assign
Object.assign(a, b)
console.log(a)   // { a: 1, b: 2 }


