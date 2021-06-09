let Promise = require('./珠峰_promise_手写实现.js')

let promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve('成功')
    }, 1000)
    // console.log(1)
    // resolve('成功')
    // reject('玩具多')
    // throw new Error('报错')
})

promise.then(function(val){
    console.log(val, 'success')
},function(err){
    console.log(err, 'fail')
})