// forEach 封装
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

// clone1
function clone1(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone1(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};


// clone2
function clone2(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        const isArray = Array.isArray(target);

        let cloneTarget = isArray ? [] : {};
        
        // 解决循环引用
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);

        // for..in 效率比较低
        // for (const key in target) {
        //     cloneTarget[key] = clone(target[key], map);
        // }

        // 封装一个 forEach 方法
        const keys = isArray ? undefined : Object.keys(target);

        
        forEach(keys || target, (value, key) => {
            if (keys) {
                key = value;
            }
            cloneTarget[key] = clone2(target[key], map);
        });

        return cloneTarget;
    } else {
        return target;
    }
};

export { clone1, clone2 }