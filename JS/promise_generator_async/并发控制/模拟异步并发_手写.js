// 豆包上仔细研究过的！！

let urls = ['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7']
let limit = 3

async function fetchUrl(i) {
    try {
        const res = await fetch(urls[i])
        return res.json()
    } catch (e) {
        throw new Error('单个请求出错');
    }
}

function concurRequest() {
    return new Promise((resolve, reject) => {
        let i = 0
        let count = 0
        let results = new Array(len)
        let status = new Array(len)

        async function request() {
            let curIdx = i  // TODO:暂存当前索引，避免i变化导致出错
            i++
            if (i >= urls.length) {
                return;
            }

            fetchUrl(curIdx)
                .then((res) => {
                    status[curIdx] = true
                    results[curIdx] = res  // TODO:响应体处理，注意此处是res.json()，不是res哦！！
                })
                .catch(() => {
                    status[curIdx] = false
                    results[curIdx] = null
                })
                .finally(() => {
                    count++
                    request()
                    if (count === len) {
                        let hasError = status.some(it => !it)
                        if (hasError) {
                            reject('存在请求失败')
                        } else {
                            resolve(results)
                        }
                    }
                })
        }

        let max = Math.min(urls.length, limit)

        for (let i = 0; i < max; i++) {
            request()
        }
    })
}

// fetch方法
async function fetchUrl2(i) {
    return new Promise((resolve, reject) => {
        fetch(urls[i])
            .then((res) => {
                // resolve(res.json())
                // TODO:不要用resolve包裹，不然加了一层Promise，获取值的时候会变成fetchUrl().then().then()
                return res.json()
            }).catch(() => {
                reject('单个请求出错')
            })
    })
}