const a = /hi\d/ig;
console.log(a.source);   //   hi\d
console.log(a.flags)    // ig


function deepClone(target) {
  if (target instanceof Object) {
    let dist;
    if (target instanceof RegExp) {
      // 拷贝正则表达式
      dist = new RegExp(target.source, target.flags);
    }
    for (let key in target) {  // 正则不会进该for循环
      dist[key] = deepClone(target[key]);
    }
    return dist;
  } else {
    return target;
  }
}

console.log('克隆前：', a)
console.log('克隆后：', deepClone(a))
