let Promise = require('./珠峰_promise_手写实现.js')

let promise = new Promise((resolve, reject)=>{
    console.log('同步')
    setTimeout(()=>{
        // resolve('成功')
        reject('失败')
    }, 2000)
    // resolve('成功')
})

promise.then(function(val){
    console.log(val, 'success')
},function(err){
    console.log(err, 'fail')
})

promise.then(function(val){
    console.log(val, 'success')
},function(err){
    console.log(err, 'fail')
})

promise.then(function(val){
    console.log(val, 'success')
},function(err){
    console.log(err, 'fail')
})