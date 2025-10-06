/**
函数特点：
    1. 处理的数据类型：基本数据类型、引用类型
    2. 引用类型有：Date、Regexp、Function、Set、Map、Array、Object
    3. 循环引用处理，避免爆栈：Set、Map、Array、Object
    4. 对象深拷贝：
        （1）创建新对象时保留其原型链
        （2）拷贝的属性是实例自有属性（可枚举 & 不可枚举、字符串键 & Symbol键）
 */

function deepClone(target, weakMap = new WeakMap()) {
    // 六大基本数据类型
    if (target === null || typeof target !== 'object') {
        // if (!(target instanceof Object)) {  // 语义不清晰
        return target
    }
    // 处理循环引用
    if (weakMap.has(target)) {
        return weakMap.get(target);
    }
    // 日期对象
    if (target instanceof Date) {
        return new Date(target.getTime());
    }

    // 正则对象
    if (target instanceof RegExp) {
        return new RegExp(target.source, target.flags);
    }

    // Map：键和值分别进行拷贝
    if (target instanceof Map) {
        const clonedMap = new Map();
        weakMap.set(target, clonedMap);  // 处理循环引用

        target.forEach((value, key) => {
            clonedMap.set(deepClone(key, weakMap), deepClone(value, weakMap));
        });
        return clonedMap;
    }

    // Set：每个元素进行拷贝
    if (target instanceof Set) {
        const clonedSet = new Set();
        weakMap.set(target, clonedSet);   // 处理循环引用

        target.forEach(value => {
            clonedSet.add(deepClone(value, weakMap));
        });
        return clonedSet;
    }

    // 函数：直接返回原函数即可，函数的深拷贝很难完美实现！
    if (target instanceof Function) {
        return target;
    }

    // 数组
    if (Array.isArray(target)) {
        const clonedArr = [];
        weakMap.set(target, clonedArr);

        // 用 for 循环或 forEach 遍历，保证顺序 并且 只处理索引元素
        target.forEach(item => {
            clonedArr.push(deepClone(item, weakMap));
        });
        return clonedArr;
    }

    // 创建新对象并保留原型链
    const clonedObj = new target.constructor();

    // 遍历实例自有属性（可枚举 & 不可枚举、字符串键 & Symbol键）
    const ownKeys = Reflect.ownKeys(target);
    ownKeys.forEach(key => {
        clonedObj[key] = deepClone(target[key], weakMap);
    });

    weakMap.set(target, clonedObj);

    return clonedObj
}