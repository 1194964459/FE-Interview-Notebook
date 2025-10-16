/**
 * 参数：
 *    1. 必须是数组
 *    2. 另外数组中每个成员都必须是Promise（如果不是promise，需要用Promise.resolve将其转为promise）
 */
function PromiseAll(promises) {
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
                .catch((err) => {
                    reject(err)
                })
        }

    })

}