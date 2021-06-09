function Promise(executor){
    this.status = 'pending'
    this.value = 'undefined'
    this.reason = 'undefined'
    this.onResolveCallbacks = [] // 存放 成功的回调
    this.onRejectCallbacks = []  // 

    let self = this

    function resolve(value){
        if(self.status == 'pending'){
            self.value = value
            self.status = 'fulfilled'
            self.onResolveCallbacks.forEach(fn => fn())
        }
    }
    
    function reject(reason){
        if(self.status == 'pending'){
            self.reason = reason
            self.status = 'rejected'
            self.onRejectCallbacks.forEach(fn => fn())
        }
    }

    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)  // 若报错，调用then方法的失败即可
    }
}

Promise.prototype.then = function(onfulfilled, onrejected){
    let self = this

    if(self.status == 'fulfilled'){
        onfulfilled(self.value)
    }
    if(self.status == 'rejected'){
        onrejected(self.reason)
    }

    if(self.status == 'pending'){  // 异步执行时
        self.onResolveCallbacks.push(function(){
            onfulfilled(self.value)
        })
        self.onRejectCallbacks.push(function(){
            onrejected(self.reason)
        })
    }
}

module.exports = Promise