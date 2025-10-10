function fetch(url) {
    return new Promise(resolve => {   // 模拟接口请求
        setTimeout(() => {
            resolve(url)
        }, 1000 * Math.random())
    })
}

// 当请求地址数组集合长度为0，则执行回调函数（如果有的话），并结束后续执行

/**
 * 接口请求最大并发量控制
 * @param { Array } urls 接口请求地址数组集合
 * @param { Number } max 最大并发量
 * @param { Function } callback 回调函数 
 */
function maxRequestLimit(arr, max, callback) {
    if (!arr || !max) return

    if (arr.length === 0) {
        if (callback) callback()
        return
    }

    let fetchArr = [], // 存储并发max的promise数组
        i = 0;

    function toFetch() {
        // 所有的请求都受理，则返回一个resolve
        if (i === arr.length) return Promise.resolve()

        // 取出第i个url， 放入fetch里面 , 每取一次i++
        let one = fetch(arr[i++])

        //将当前的promise存入并发数组中
        fetchArr.push(one)

        // 当promise执行完毕后，从数组删除
        one.then(res => {
            console.log(res)
            fetchArr.splice(fetchArr.indexOf(one), 1)
        })

        let p = Promise.resolve()

        // 当并行数量达到最大后， 用race比较 第一个完成的， 然后再调用一下函数自身。
        if (fetchArr.length >= max) p = Promise.race(fetchArr)

        return p.then(() => toFetch())
    }

    // arr循环完后， 现在fetchArr里面剩下的promise对象， 使用all等待所有的都完成之后执行callback
    toFetch()
        .then(() => Promise.all(fetchArr))
        .then(() => callback())
}


maxRequestLimit(['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7', 'url8'], 3, () => { console.log('fetch end') })
