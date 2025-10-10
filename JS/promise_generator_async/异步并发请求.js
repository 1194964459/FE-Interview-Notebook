function request(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`请求 ${url} 完成`);
            resolve(`响应数据 from ${url}`);
        }, Math.random() * 1000);
    });
}

function concurrentControl(requests, maxConcurrent) {
    const results = [];
    let count = 0;
    const executeRequest = (index) => {
        if (index < requests.length) {
            const url = requests[index];
            count++;

            request(url)
                .then((res) => {
                    results[index] = res;
                    count--;
                    // 当还有未执行的请求且当前执行请求数小于最大并发数时，继续发起请求
                    if (count < maxConcurrent) {
                        executeRequest(index + 1);
                    }
                }).catch((err) => {
                    console.error(`请求 ${url} 失败`, err);
                    count--;
                });
        }
    };

    // 先启动最大并发数的请求
    for (let i = 0; i < Math.min(maxConcurrent, requests.length); i++) {
        executeRequest(i);
    }

    return new Promise((resolve) => {
        const checkAllDone = setInterval(() => {
            if (count === 0 && results.length === requests.length) {
                clearInterval(checkAllDone);
                resolve(results);
            }
        }, 100);
    });
}

const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];

concurrentControl(urls, 2).then((res) => {
    console.log('所有请求结果:', res);
});