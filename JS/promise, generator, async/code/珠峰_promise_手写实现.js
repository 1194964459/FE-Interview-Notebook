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

// 处理 旧promise 返回值(x) 与 新promise(then 返回) 的关系，根据返回结果，看新promise是成功？还是失败？
function resolvePromise(promise2, x, resolve, reject){
  /** 对 x 进行判断：
   * 1. 若 x 是一个普通值，直接resolve
   * 2. 若 x 是一个 promise，x 的状态决定新的 promise 的状态
   */
  resolve(x)
}

Promise.prototype.then = function(onfulfilled, onrejected){
  let self = this

  // 返回新的promise，让当前的 then 方法执行后，可以继续 then
  let promise2 = new Promise((resolve, reject)=>{
    if(self.status == 'fulfilled'){
      // 获取promise2(下一轮事件循环开始的时候)
      setTimeout(()=>{
        try{
          let x = onfulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        }catch(e){
          reject(e)
        }
      })
      
      // console.log('x :', x)
      // resolve(x)
    }
    if(self.status == 'rejected'){
      setTimeout(()=>{
        try{
          let x = onrejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        }catch(e){
          reject(e)
        }
      })
    }

    if(self.status == 'pending'){  // 异步执行时
      self.onResolveCallbacks.push(function(){
          setTimeout(()=>{
            try{
              let x = onfulfilled(self.value)
              resolvePromise(promise2, x, resolve, reject)
            }catch(e){
              reject(e)
            }         
        }) 
      })
      
      self.onRejectCallbacks.push(function(){
        setTimeout(()=>{
          try{
            let x = onrejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          }catch(e){
            reject(e)
          }       
        })
      })
    }
  })

  return promise2
}

module.exports = Promise