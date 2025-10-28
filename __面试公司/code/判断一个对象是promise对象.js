// const p = new Promise(() => { })
// console.log(p instanceof Promise)


// 这不是 Promise 实例，但有 then 方法，所以是 thenable
const myThenable = {
    then: function (onFulfilled, onRejected) {
        setTimeout(() => {
            onFulfilled("我是 thenable 的结果");
        }, 1000);
    }
};

// 可以用 Promise.resolve() 把 thenable 转成标准 Promise
Promise.resolve(myThenable).then(result => {
    console.log(result); // 输出 "我是 thenable 的结果"
});