let urls = ['url1', 'url2', 'url3', 'url4', 'url5']
let limit = 3

async function fetchUrl(url) {
    try {
        let res = await fetch(url)
        return res.json()
    } catch (e) {
        console.log('e:', e)
        throw e
    }
}

// TODO:每一个url都对应一个返回promise的函数
const requestFuncs = urls.map(url => () => fetchUrl(url))

async function concurRequest(limit, arr) {
    let results = [] // 所有请求的 Promise
    let executing = []  // 正在执行请求的 Promise

    for (let req of arr) {
        let p = req()
        results.push(p)

        // 当请求无论成功还是失败完成时，在 executing 数组中找到该 Promise 的索引并删除，
        p.finally(() => {
            let idx = executing.indexOf(p)
            if (idx != -1) {
                executing.splice(idx, 1)
            }
        })
        executing.push(p)

        if (executing.length >= limit) {
            await Promise.race(executing)
        }
    }
    // TODO:收集执行结果
    return Promise.all(results)
}

concurRequest(limit, requestFuncs)
    .then(res => console.log('所有请求结果:', res))
    .catch(err => console.log('请求失败:', err))