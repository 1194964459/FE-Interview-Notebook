/**
 * 值为undefined，被忽略；
 * 值为函数，被忽略；
 * 值为正则，转为一个空对象；
 * 值为Date对象，转为字符串；
 * 
 * 
 * 
 * undefined、symbol、函数会被直接忽略
 * 无法处理Date、RegExp、Map、Set等。Date转为字符串，另外三个会转成空对象
  丢失不可枚举属性：无法复制enumerable: false的属性。
  循环引用（属性值指向自身），报错
 */

// 1. 
let obj1 = {
  b: undefined,  // 被忽略 
  sy: Symbol('key'),  // 被忽略 
  f() {  // 被忽略
    console.log('function')
  },
  data: new Date(),  // Date类型的数据会被转变成字符串。从而丢失Date的一些特性，如getTime()等格式化方法 
  a: /he/g,  // 正则转为一个空对象{}
  m: new Map(),  // Map转为空对象{}
  s: new Set(),  // Set转为空对象{}
}

let obj2 = JSON.parse(JSON.stringify(obj1))

console.log(obj2)
// 打印结果：
// {
// b: undefined,
// sy: Symbol(key),
// f: [Function: f],
// data: 2025-07-31T03:20:46.238Z,
// a: /he/g,
// m: Map(0) {},
// s: Set(0) {}
// } 

// console.log(obj2)   // { data: '2025-07-31T03:20:46.238Z', a: {}, m: {}, s: {}  }

// 2.循环引用
let obj = {
  name: '1',
}
obj.self = obj

// console.error(obj)  // <ref *1> { name: '1', self: [Circular *1] }

// console.error(JSON.parse(JSON.stringify(obj)))  // 报错：TypeError: Converting circular structure to JSON