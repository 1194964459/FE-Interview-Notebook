let Promise = require('./珠峰_promise_手写实现.js')

let p = new Promise((resolve, reject)=>{
    resolve(123)
    // reject(123)
})

let promise2 = p.then(data =>{
    // 默认返回 undefined
    // console.log(data) 

    // return data 
    
    // throw new Error(123)

    return new Promise()
}, err =>{
    // console.log(err)
    return err+400
})

promise2.then(data =>{
    console.log(data, '****')
    // return 456
},err =>{
    console.log(err, '----')
})

// 123
// x : undefined
// undefined ----
// x : undefined