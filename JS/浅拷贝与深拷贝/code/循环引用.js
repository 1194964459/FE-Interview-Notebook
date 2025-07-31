/**
 * 需
 */

/**
 * deepClone
 */
function deepClone(target) {
  if (target instanceof Object) {
    // 此处只拷贝普通对象，其他类型暂不考虑
    let dist = {};

    for (let key in target) {
      // 过滤掉原型身上的属性
      if (target.hasOwnProperty(key)) {
        dist[key] = deepClone(target[key]);
      }
    }
    return dist;
  } else {
    return target;
  }
}

/**
 * deepCacheClone func
 */
let cache = new Map();
function deepCacheClone(target) {
  if (cache.get(target)) {
    return cache.get(target)
  }

  if (target instanceof Object) {
    // 拷贝普通对象
    let dist = {};

    // 将属性和拷贝后的值作为一个map
    cache.set(target, dist);
    for (let key in target) {
      // 过滤掉原型身上的属性
      if (target.hasOwnProperty(key)) {
        dist[key] = deepClone(target[key]);
      }
    }
    return dist;
  } else {
    return target;
  }
}

// let b = { name: "小明" };
// b.self = b;   // a的self属性指向a

// <ref *1> { name: '小明', self: [Circular *1] }
// console.log(b)

// console.log(deepCacheClone(b))

// RangeError: Maximum call stack size exceeded
// at Function.[Symbol.hasInstance](<anonymous>)
//   at deepClone (/Users/yanglixia/FE-Interview-Notebook/JS/浅拷贝与深拷贝/code/循环引用.js:11:14)
//   at deepClone (/Users/yanglixia/FE-Interview-Notebook/JS/浅拷贝与深拷贝/code/循环引用.js:37:21)
//   at deepClone (/Users/yanglixia/FE-Interview-Notebook/JS/浅拷贝与深拷贝/code/循环引用.js:37:21)
//   at deepClone (/Users/yanglixia/FE-Interview-Notebook/JS/浅拷贝与深拷贝/code/循环引用.js:37:21)
//   at deepClone (/Users/yanglixia/FE-Interview-Notebook/JS/浅拷贝与深拷贝/code/循环引用.js:37:21)
//   at deepClone (/Users/yanglixia/FE-Interview-Notebook/JS/浅拷贝与深拷贝/code/循环引用.js:37:21)
// console.log(deepClone(a))

// console.log(JSON.parse(JSON.stringify(a)))  // typeError: Converting circular structure to JSON


/**
 * 共用缓存
 */

let a = {
  name: "hello",
}
let a1 = deepCacheClone(a);
console.log(a1);  //{ name: 'hello' } => { name: 'hello' }
let b = {
  age: 24
}
let b1 = deepCacheClone(b);
console.log(b1);  //   { name: 'hello' } => { name: 'hello' },{ age: 24 } => { age: 24 } }
