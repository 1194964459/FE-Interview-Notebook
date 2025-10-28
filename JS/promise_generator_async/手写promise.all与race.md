# 手写promise.all

```JS
/** 
 * 静态方法
 * 
 * 参数：
 *    1. 必须是数组
 *    2. 另外数组中每个成员都必须是Promise（如果不是promise，需要用Promise.resolve将其转为promise）
 */
static function PromiseAll(promises) {
    let count = 0, res = []

    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            reject('参数必须是数组')
        }

        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i])
                .then((value) => {
                    res[i] = value
                    count++
                    if (count === promises.length) {
                        resolve(res)
                    }
                })
                .catch(err=>{
                    reject(err)
                })          
        }
    })
}

//静态方法
static race(promiseArr) {
    return new Mypromise((resolve, reject) => {
        if (!Array.isArray(promiseArr)) {
            reject('参数必须是数组')
        }
        for (let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i])
                .then(res => {
                    //promise数组只要有任何一个promise 状态变更  就可以返回
                    resolve(res);
                })
                .catch((err) => {
                    reject(err)
                })
        }
    });
}


let promise2 = new Mypromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1234);
    }, 1000);
});

Mypromise.all([promise1,promise2]).then(res=>{
    console.log(res);
})

Mypromise.race([promise1, promise2]).then(res => {
    console.log(res);
});
```