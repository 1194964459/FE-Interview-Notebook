function deepClone(target, cache = new WeakMap()){
    if(cache[target]){
        return cache[target]
    }

    if(target instanceof Object){
        let dist
        // 数组
        if(target instanceof Array){
            dist = []
        }
        // 函数
        else if(target instanceof Function){
            dist = function(){
                return target.call(this, ...arguments)
            }
        }
        // 日期
        else if(target instanceof Date){
            dist = new Date(target)
        }
        // 正则
        else if(target instanceof RegExp){
            dist = new RegExp(target.source, target.flags)
        }
        // 普通对象
        else {
            dist = {}
        }

        cache.set(target, dist)
        for(let key in target){
            if(target.hasOwnProperty(key)){
                dist[key] = deepClone(target[key], cache)
            }
        }
        return dist;
    }else{
        return  target
    }
}

export {deepClone}