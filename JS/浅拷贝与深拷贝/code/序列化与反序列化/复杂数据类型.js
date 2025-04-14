/**
 * 值为undefined，被忽略；
 * 值为函数，被忽略；
 * 值为正则，转为一个空对象；
 * 值为Date对象，转为字符串；
 * 循环引用（属性值指向自身），报错
 */

// 1. 
let obj1 = {
  a: /he/g,  // 正则转为一个空对象
  b: undefined,  // 被忽略 
  f() {  // 被忽略
    console.log('function')
  },
  data: new Date()  // Date类型的数据会被转变成字符串。从而丢失Date的一些特性，如getTime()等格式化方法 
}

let obj2 = JSON.parse(JSON.stringify(obj1))

console.log(obj1)
// 打印结果：
// {
//   a: /he/g,
//   b: undefined,
//   f: [Function: f],
//   data: 2022-09-07T07:37:33.815Z
// } 

console.log(obj2)   // { a: {}, data: '2022-09-07T07:37:33.815Z' }

// 2.循环引用
let obj = {
  name: '1',
}
obj.self = obj

// console.error(obj)  // <ref *1> { name: '1', self: [Circular *1] }

console.error(JSON.parse(JSON.stringify(obj)))  // 报错：TypeError: Converting circular structure to JSON