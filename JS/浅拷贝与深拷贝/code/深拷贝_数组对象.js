function deepClone(target) {
  if (target instanceof Object) {
    let dist = target instanceof Array ? [] : {}
    for (let key in target) {
      // 递归调用自己获取到每个值
      dist[key] = deepClone(target[key]);
    }
    return dist;
  } else {
    return target;
  }
}
/**
 * 对象
 */
// let obj1 = {
//   name: "hello",
//   child: {
//     name: "小明"
//   }
// }
// let obj2 = deepClone(obj1);
// console.log(obj2)

/**
 * 数组
 */

const a = [[11, 12], [21, 22]];
const a2 = deepClone(a);
console.log(a2); //{ '0': { '0': 11, '1': 12 }, '1': { '0': 21, '1': 22 } }


