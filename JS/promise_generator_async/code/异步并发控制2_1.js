/**
 * 对“异步并发控制2.js”的改写，要求的并发数为1，
 * 
 * 这样的话，其实就变成了同步任务！一下用同步任务来模拟一下...
 */

let beforTime = Date.now()

/**
 * ES7基于async、await实现
 */
const timeout = i => new Promise(resolve => setTimeout(() => {
  console.log(i, '  ', Date.now() - beforTime)
  resolve(i)
}, i));
// 函数调用
asyncPool(2, [1000, 5000, 3000, 2000], timeout);

/**
 * 
 * @param {*} poolLimit 限制的并发数；
 * @param {*} array 任务数组
 * @param {*} iteratorFn 每个任务项都需要进行的迭代函数，该函数会返回一个promise对象或异步函数
 */
async function asyncPool(poolLimit, array, iteratorFn) {
  // let ret = []  //存储所有的异步任务
  // for (const i of array) {
  //   const p = Promise.resolve().then(() => iteratorFn(i))
  //   ret.push(p)
  //   // p.then(async () => {
  //   //   // ret.splice(ret.indexOf(p), 1)  // 异步任务中剔除”已经执行的异步任务”，但是下标??? TODO:
  //   //   console.log('len:', ret.length)
  //   // })
  // }
  // return Promise.all(ret)
  for (const i of array) {
    await iteratorFn(i)
  }
}
