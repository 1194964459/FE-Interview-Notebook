function deepClone(target, cache = new Map()) {
    // 环状对象的爆栈问题
    // 判断一个对象是否已经被克隆过了，如果被克隆过了，就直接使用克隆后的对象，不再进行递归。
    if(cache.get(target)){
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
            // 拷贝日期
            dist = new Date(target);
        } else {
            // 拷贝普通对象
            dist = {};
        }

        // 将属性和拷贝后的值作为一个map
        cache.set(target, dist);
        // console.log('cache: ', cache)

        for (let key in target) {
             // 过滤掉原型身上的属性，仅仅考虑对象自身属性
            if (target.hasOwnProperty(key)) {
                dist[key] = deepClone(target[key], cache);
            }
        }

        return dist;
    } else {
        return target;
    }
}


export { deepClone }