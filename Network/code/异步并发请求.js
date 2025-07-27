/**
 * 基于Promise的异步并发请求，基本思路：
 * 1. 所有请求存储在一个队列中
 * 2. 并发数控制：当前正在执行的请求数量 小于 并发数时，从队列中取出请求并执行，直至所有请求执行完毕
 * 3. 结果收集：按原始请求“顺序”收集每个请求的结果。若有的请求失败，立即终止所有请求？或者忽略继续执行其他请求？
 */

async function fetchData(url) {
    const res = await fetch(url)
    return res.json()
}

const urls = [
    'https://api.example.com/data/1',
    'https://api.example.com/data/2',
    'https://api.example.com/data/3',
    'https://api.example.com/data/4',
    'https://api.example.com/data/5'
]

const requestFunctions = urls.map(url => () => fetchData(url))

// 并发请求
function concurrentRequests(requestFunctions, limit = 5) {
    return new Promise((resolve, reject) => {
        const results = [] // 按索引号存储结果数据
        let curIdx = 0  // 当前请求的索引
        let activeCount = 0  // 当前活跃的请求数量
        let hasError = false  // 是否有错误发生

        // 调度函数
        function next() {
            // 已经有错误，将不再继续执行
            if (hasError) {
                return;
            }
            if (curIdx >= requestFunctions.length) {
                if (activeCount == 0) {
                    resolve(results)
                }
                return;
            }

            const idx = curIdx // index 是在每次循环迭代时创建的局部变量，它捕获了当前请求的正确索引
            const request = requestFunctions[idx]
            curIdx++
            activeCount++

            request()
                .then((res) => {
                    results[idx] = res   // 注意这里是一定要用index，curIdx迭代中会被外部修改
                })
                .catch(err => {
                    hasError = true
                    reject(err)
                })
                .finally(() => {
                    activeCount--;
                    next()   // 无论成功失败都尝试执行下一个请求
                })
        }

        let initCount = Math.min(limit, requestFunctions.length)
        for (let i = 0; i < initCount; i++) {
            next()
        }
    })
}

concurrentRequests(requestFunctions, 2)
    .then(results =>
        console.log('所有请求结果', results)
    )
    .catch(error => {
        console.error('请求过程中发生错误！', error)
    })
