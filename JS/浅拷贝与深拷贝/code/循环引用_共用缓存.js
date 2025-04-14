let cache = new Map();
function deepClone(target) {
  if (cache.get(target)) {
    return cache.get(target)
  }
  if (target instanceof Object) {
    let dist;
    if (target instanceof Array) {
      // 拷贝数组
      dist = [];
    } else if (target instanceof Function) {
      // 拷贝函数
      dist = function () {
        return target.call(this, ...arguments);
      };
    } else if (target instanceof RegExp) {
      // 拷贝正则表达式
      dist = new RegExp(target.source, target.flags);
    } else if (target instanceof Date) {
      dist = new Date(target);
    } else {
      // 拷贝普通对象
      dist = {};
    }
    // 将属性和拷贝后的值作为一个map
    cache.set(target, dist);
    for (let key in target) {
      // 过滤掉原型身上的属性
      if (target.hasOwnProperty(key)) {
        dist[key] = deepClone(target[key]);
      }
    }
    console.log(cache)
    return dist;
  } else {
    return target;
  }
}

let a = {
  name: "hello",
}
let a1 = deepClone(a);
// console.log(cache);  //{ name: 'hello' } => { name: 'hello' }
console.log('\n')
let b = {
  age: 24
}
let b1 = deepClone(b);
// console.log(cache);  //   { name: 'hello' } => { name: 'hello' },{ age: 24 } => { age: 24 } }
