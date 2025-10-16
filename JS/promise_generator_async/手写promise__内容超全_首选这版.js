/**
 * 参考：https://juejin.cn/post/6844903625769091079
 */

class Promise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }


    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                // then的回调是异步，需用setTimeout模拟异步
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };

            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };

            if (this.state === 'pending') {
                this.onResolvedCallbacks.push(() => {   // 考虑异步的情况
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
            };
        });
        return promise2;
    }
    catch(fn) {
        return this.then(null, fn);
    }
}

/**
 * 处理then回调函数的返回值、与 then函数的返回值 的关系
 * @param {*} promise2 then函数的返回值，一个新的promise
 * @param {*} x then回调函数的返回值
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(promise2, x, resolve, reject) {
    // 循环引用报错
    if (x === promise2) {
        reject(new TypeError('Chaining cycle detected for promise'));
    }

    else if (x instanceof MyPromise) {
        x.then(resolve, reject);
    }
    // 判断 x 是否是 thenable 对象（即含有 then 方法的对象，可视为类 Promise 结构）
    else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            // 如果 then 是函数：说明 x 是 thenable 对象，需要调用 then 方法，并把新 Promise 的 resolve 和 reject 作为参数传递。
            // 如果 then 不是函数：说明 x 只是普通对象，直接 resolve(x)
            const then = x.then;    // 读取 x.then 可能触发 getter 或抛出异常;出错，会直接 reject(e)
            if (typeof then === 'function') {
                then.call(x, resolve, reject);
            } else {
                resolve(x);
            }
        } catch (e) {
            reject(e);
        }
    }
    else {
        resolve(x);
    }
}


//resolve方法
Promise.resolve = function (val) {
    return new Promise((resolve, reject) => {
        resolve(val)
    });
}
//reject方法
Promise.reject = function (val) {
    return new Promise((resolve, reject) => {
        reject(val)
    });
}
//race方法 
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        };
    })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function (promises) {
    let arr = [];
    let i = 0;
    function processData(index, data) {
        arr[index] = data;
        i++;
        if (i == promises.length) {
            resolve(arr);
        };
    };
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                processData(i, data);
            }, reject);
        };
    });
}
