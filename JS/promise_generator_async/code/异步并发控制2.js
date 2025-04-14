/**
 * 参考：https://juejin.cn/post/6976028030770610213
 */

/**
 * function asyncPool(poolLimit, array, iteratorFn){ ... }
 * 
 * 该函数接收 3 个参数:
 *    poolLimit（数字类型）：表示限制的并发数；
 *    array（数组类型）：表示任务数组；
 *    iteratorFn（函数类型）：表示迭代函数，用于实现对每个任务项进行处理，该函数会返回一个 Promise 对象或异步函数。
 */

let beforTime = Date.now()
/**
 * ES7基于async、await实现
 */
const timeout = i => new Promise(resolve => setTimeout(() => {
  console.log(i, '  ', Date.now() - beforTime)
  // beforTime = Date.now()
  resolve(i)
}, i));
// 函数调用
asyncPool(2, [1000, 5000, 3000, 2000], timeout);

async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成
      }
    }
  }
  return Promise.all(ret); // Promise.all()方法将多个 Promise 实例，包装成一个新的 Promise 实例。 TODO:使用promise.all()的意义是？返回一个新的promise?
}

// 输出：
// 1000
// 3000
// 5000
// 2000 
// 以上顺序符合预期！