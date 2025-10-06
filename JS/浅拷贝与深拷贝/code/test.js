// let s = Symbol()
// console.log(s instanceof Object)  // false
// console.log(typeof s)  // symbol
console.log(null instanceof Object)  // false


function deepClone(target) {
    if (target instanceof Object) {
        // 法1：
        // let dist = target instanceof Array ? [] : {};  // 原型链会丢失

        // 法2：使用原对象的构造函数创建新对象，保留原型链
        const dist = new target.constructor();

        for (let key in target) {
            if (Object.prototype.hasOwnProperty.call(target, key)) {
                // 递归调用自己获取到每个值
                dist[key] = deepClone(target[key]);
            }
        }
        return dist;
    } else {
        return target;
    }
}



let obj = {
    // String、Number、Boolean、Null、Undefined、Symbol
    s: 'string',
    n: 1,
    b: true,
    nu: null,
    undef: undefined,
    sym: Symbol('symbol'),
    ob: {
        a: 1,
        b: { c: 2 },
        arr: [5]
    },
    arr: [1, 2, [3, 4]]
}

// let res = deepClone(obj)
// console.log(res)