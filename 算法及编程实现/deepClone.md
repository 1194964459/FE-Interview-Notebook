```javascript
// target是待拷贝对象
const target = {
    field1: 1,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target;
```

## 一、调用现成api实现：
```javascript
JSON.parse(JSON.stringify(target));
```

## 二、手动实现
### 1. 浅拷贝
```javascript
function clone_shallow(target) {
    let cloneTarget = {};
    for (const key in target) {
        cloneTarget[key] = target[key];
    }
    return cloneTarget;
};
```

### 2. 深拷贝：拷贝对象是Object（需要考虑递归层级）
1. 如果是原始类型，无需继续拷贝，直接返回
2. 如果是引用类型，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后，依次添加到新对象上。

```javascript
function clone_deep_object(target) {
    if (typeof target === 'object') {
        let cloneTarget = {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
```


### 3.深拷贝：拷贝对象是数组
 
```javascript
function clone_deep_array(target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
```

### 4.解决'循环引用'问题
```javascript
function clone_deep_circular(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return target;
        }
        map.set(target, cloneTarget);

        for (const key in target) {
            cloneTarget[key] = clone_deep_circular(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
```


### 5.性能优化
```javascript
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function clone_deep_performance(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        const isArray = Array.isArray(target);
        let cloneTarget = isArray ? [] : {};

        if (map.get(target)) {
            return target;
        }
        map.set(target, cloneTarget);

        const keys = isArray ? undefined : Object.keys(target);
        forEach(keys || target, (value, key) => {
            if (keys) {
                key = value;
            }
            console.log('key： ', key)
            cloneTarget[key] = clone_deep_performance(target[key], map);
        });

        return cloneTarget;
    } else {
        return target;
    }
}

// clone_deep_performance(target)
```



上面只考虑了Object、Array两种类型，引用类型远不止这些
  
 