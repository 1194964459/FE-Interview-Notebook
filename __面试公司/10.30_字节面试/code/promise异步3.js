Promise.resolve()
    .then(() => {
        // 第一个 then 回调（无返回值）
        console.log('第一个 then 回调');
    })
    .then(() => {
        // 第二个 then 回调
        console.log('第二个 then 回调');
    });

// 与第一个 then 并排的同步 console
console.log('同步代码');



// 同步代码
// 第一个 then 回调
// 第二个 then 回调