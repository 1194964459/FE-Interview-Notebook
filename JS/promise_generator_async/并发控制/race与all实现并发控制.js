/**
 * asyncPool 函数的作用是：
 *      限制同时执行的 timeout 任务数不超过 limit（这里是 2）。当任务数达到上限时，用 await Promise.race(executing) 等待 “任意一个任务先完成”，再补充新任务，最终用 Promise.all(results) 等待所有任务完成。
 *
 */
const beforTime = Date.now();

const timeout = delay =>
    new Promise(resolve => {
        setTimeout(() => {
            console.log(delay, ' ', Date.now() - beforTime);
            resolve(delay);
        }, delay);
    });

async function asyncPool(limit, arr) {
    const results = [];
    const executing = [];

    for (const delay of arr) {
        const p = timeout(delay);
        results.push(p);

        p.finally(() => {
            const idx = executing.indexOf(p)
            if (idx != -1) {
                executing.splice(idx, 1)
            }
        })
        executing.push(p)

        if (executing.length >= limit) {
            await Promise.race(executing);
        }
    }

    return Promise.all(results);
}

asyncPool(2, [1000, 3000, 2000]).then(results => {
    console.log('并发控制后，所有任务完成：', results);
});

// 执行结果：
// 1000   1003
// 3000   3004
// 2000   3036
// 并发控制后，所有任务完成： [ 1000, 3000, 2000 ]

/**
asyncPool内部循环过程：
for循环：
    1. 第一次循环，处理任务 1000：同步执行，创建p1（延迟 1000ms 的 Promise）、e1（获取p1的完成状态）
    2. 第二次循环，处理任务 3000：
        （1）同步执行，创建p2（延迟 3000ms 的 Promise）、e2（获取p2的完成状态）
        （2）触发 await Promise.race([e1, e2])：暂停 asyncPool 函数执行，等待 e1 或 e2 先完成。

    3. 同步任务卡柱了，微任务执行
        （1）p1（延迟 1000ms）先完成，它会导致两处的变化：e1.then() 与 Promise.race([e1, e2])
    4. 第三次循环，处理任务 2000：
        （1）同步执行，创建p3（延迟 2000ms 的 Promise）、e3（获取p3的完成状态）
        （2）触发 await Promise.race([e2, e3])：暂停 asyncPool 执行，等待 e2 或 e3 先完成。
    5. 假设 p3（延迟 2000ms）比 p2（延迟 3000ms）先完成：....参考上面被卡住的流程
    6. for循环结束后，执行 return Promise.all(results)

当 Promise.all(results) 完成后，外层 then 回调执行，打印console
 */