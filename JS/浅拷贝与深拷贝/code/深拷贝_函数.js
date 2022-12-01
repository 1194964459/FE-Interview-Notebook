/**
 * 两大功能需具备：
   (1)函数实现的功能要相同——返回的值相同
   (2)函数身上的引用类型的属性要不相同，直接类型的属性的值要相同
 */

function deepClone(target) {
  if (target instanceof Object) {
    let dist
    if (target instanceof Array) {
      dist = []
    } else if (target instanceof Function) {
      dist = function () {
        return target.call(this, ...arguments)
      }
    } else {
      dist = {}
    }
    for (let key in target) {
      dist[key] = deepClone(target[key])
    }
    return dist;
  } else {
    return target;
  }
}


const fn = function () {
  return 1
};
fn.xxx = { yyy: { zzz: 1 } };

const fn2 = deepClone(fn);
console.log(fn2)
console.log(fn2())
// 基本特性
console.log(fn !== fn2);                 // 函数不相同
console.log(fn.xxx !== fn2.xxx);          // 函数引用类型的属性不相同
console.log(fn.xxx.yyy !== fn2.xxx.yyy);  // 函数引用类型的属性不相同
console.log(fn.xxx.yyy.zzz === fn2.xxx.yyy.zzz);// 函数简单类型的属性值相同
console.log(fn() === fn2());            //  函数执行后相等