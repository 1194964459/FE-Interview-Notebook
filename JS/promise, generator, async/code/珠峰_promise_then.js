let Promise = require('./珠峰_promise_手写实现.js')

let fs = require('fs')
fs.readFile('./name.txt', 'utf8', function(err, data){
    fs.readFile('./age.txt', 'utf8', function(err, data){
        console.log(data)
    })
})


let promise = new Promise((resolve, reject)=>{
    resolve(123)
})

promise.then(data =>{
    console.log(data)    
})
