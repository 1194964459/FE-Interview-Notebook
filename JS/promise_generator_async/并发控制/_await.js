// 模拟一个异步操作
function asyncOperation(id, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`操作${id}完成`);
            // resolve(id);
        }, delay);
    });
}

// 异步串行实现 - 使用async/await
async function serialExecute() {
    console.log('开始串行执行');
    const results = [];

    // 按顺序执行三个异步操作
    results.push(await asyncOperation(1, 1000));
    results.push(await asyncOperation(2, 500));
    results.push(await asyncOperation(3, 800));

    console.log('串行执行完成，结果:', results);
    return results;
}

serialExecute();