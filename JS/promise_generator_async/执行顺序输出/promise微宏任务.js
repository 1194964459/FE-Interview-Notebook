console.log('同步开始'); // 1. 同步开始

const promiseA = new Promise(
    resolve => setTimeout(() => resolve('A'), 100)
);
const promiseB = new Promise(
    resolve => setTimeout(() => resolve('B'), 50)
);

Promise.race([promiseA, promiseB])
    .then(result => console.log('race 结果:', result)) //
    .catch(error => console.error('race 错误:', error));

const resolvedPromise = Promise.resolve('已解决');
resolvedPromise.then(result => console.log('resolve 结果:', result)); // 

console.log('同步结束'); // 2. 同步结束

// 执行顺序：
//    同步开始
//    同步结束
//    resolve 结果: 已解决
//    race 结果: B


// promiseA 是宏任务，这种说法对吗？
