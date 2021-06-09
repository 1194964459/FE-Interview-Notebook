// Promise.all 实现
// Class中的一个方法

class Promise{
    constructor(){

    }

    static all(promiseArr){
        let result = []  //存放promise结果
        let count = 0  // 计数器，每一个promise返回就+1
        return new Mypromise((resolve, reject)=>{
            for(let i = 0; i < promiseArr.length; i++){
                promiseArr[i].then(
                    res => {
                        result[i] = res  // 注意，此处不能用push,要于异步返回结果保持一致
                        count++

                        if(count == promiseArr.length){ // 只有全部的promise状态都为fulfilled，才resolve出去
                            resolve(result)
                        }
                    },
                    err => {
                        reject(err)
                    }
                )

            }
        })
    }

    static race(promiseArr){
        return new Mypromise((resolve, reject) => {
            for(let i = 0; i < promiseArr.length; i++){
                promiseArr[i].then(
                    res =>{
                        resolve(res)  // 只要有一个状态变更，就返回
                    }, 
                    err =>{
                        reject(err)
                    }
                )
            }
        })
    }
}
