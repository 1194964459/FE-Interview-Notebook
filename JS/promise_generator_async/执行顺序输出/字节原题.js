Promise.resolve()
    .then(() => {
        Promise.resolve()
            .then(() => {
                console.log(1)
            })
            .then(() => {
                console.log(2)
            })
    })
    .then(() => {
        console.log(3)
    })

// 1
// 3
// 2

/**
 
上面案例中4个then方法，有4个回调：
then(B)“注册回调”B是同步方法，“回调方法”是异步的。所有 then 回调都是微任务

微任务何时入队？
    已决议的Promise，注册 then 时立即入队
    未决议Promise，注册 then 时暂存回调，待 Promise 决议后再入队	

Promise.resolve().then(A)已决议，因此回调A先入队；
执行回调A中的“同步代码”，Promise.resolve().then(B),回调B入队；
回调A中的同步代码执行完毕，第一个then方法已决议
回调D入队

执行回调B，回调C入队
 */
