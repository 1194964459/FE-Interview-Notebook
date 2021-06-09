class Mypromise {
  constructor(fn) {
      // 表示状态
      this.state = "pending";
      
      // 表示then注册的成功函数
      this.successFun = [];
      
      // 表示then注册的失败函数
      this.failFun = [];

      let resolve = val => {
      
          // 保持状态改变不可变（resolve和reject只准触发一种）
          if (this.state !== "pending") return;

          // 成功触发时机  改变状态 同时执行在then注册的回调事件
          this.state = "success";
          
          // 为了保证then事件先注册（主要是考虑在promise里面写同步代码） promise规范 这里为模拟异步
          setTimeout(() => {
          
              // 执行当前事件里面所有的注册函数
              this.successFun.forEach(item => item.call(this, val));
          });
      };

      let reject = err => {
          if (this.state !== "pending") return;
          
          this.state = "fail";
          
          setTimeout(() => {
              this.failFun.forEach(item => item.call(this, err));
          });
      };
      // 调用函数
      try {
          fn(resolve, reject);
      } catch (error) {
          reject(error);
      }
  }

  // 实例方法 then
  then(resolveCallback, rejectCallback) {
      // 判断回调是否是函数
      resolveCallback = typeof resolveCallback !== "function" 
          ? v => v 
          : resolveCallback;
      
      rejectCallback == typeof rejectCallback !== "function"
          ? err => {
              throw err;
          }
          : rejectCallback;

      // 为了保持链式调用  继续返回promise
      return new Mypromise((resolve, reject) => {
          
          // 将回调注册到successFun事件集合里面去
          this.successFun.push(val => {
              try {
                  //  执行回调函数
                  let x = resolveCallback(val);
                  
                  //（最难的一点）：
                  // 如果回调函数结果是普通值 那么就resolve出去给下一个then链式调用  
                  // 如果回调函数结果是一个promise对象，那么调用x的then方法 将resolve和reject传进去 等到x内部的异步 执行完毕的时候（状态完成）就会自动执行传入的resolve 这样就控制了链式调用的顺序
                  x instanceof Mypromise ? x.then(resolve, reject) : resolve(x);

              } catch (error) {
                  reject(error);
              }
          });

          this.failFun.push(val => {
              try {
                  let x = rejectCallback(val);
                  
                  x instanceof Mypromise ? x.then(resolve, reject) : reject(x);

              } catch (error) {
                  reject(error);
              }
          });
      });
  }
}

// 使用
let promise1 = new Mypromise((resolve, reject) => {
    setTimeout(() => {
        resolve(123);
    }, 2000);
});

promise1
    .then(
        res => {
            console.log(res); //过两秒输出123

            return new Mypromise((resolve, reject) => {
                setTimeout(() => {
                    resolve("success");
                }, 1000);
            });
        },
        err => {
            console.log(err);
        }
    )
    .then(
        res => {
            console.log(res); //再过一秒输出success
        },
        err => {
            console.log(err);
        }
    );