// 异步请求队列
const queue = []

// 标志是否正在处理队列中的请求
let running = false

// 异步请求并发数限制
const syncCount = 2

// 用来模拟不同的返回值
let index = 0

// 使用setTimeout模拟异步请求
function request(index) {
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve(index)
        }, 1000)
    })
}


function clickMe() {
    addQueue(() => request(index++))
}

function addQueue(item){
    queue.push(item)
    if(queue.length > 0 && !running){
        running = true
        processMulti(syncCount)
    }
}

function processMulti(count){
    let arr = []
    for(let i = 0; i<count;i++){
        const item = queue.shift()
        item && arr.push(item())
    }

    if(arr.length){
        Promise.all(arr).then(
            res =>{
                console.log(res)
                processMulti(count)
            }
        )
    }else{
        running = false
    }
}