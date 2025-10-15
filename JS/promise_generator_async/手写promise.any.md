## Promise.any 手写

Promise.any 的规则是这样：

* 空数组或者所有 Promise 都是 rejected，则返回状态是 rejected 的新 Promsie，且值为 AggregateError 的错误；
* 只要有一个是 fulfilled 状态的，则返回第一个是 fulfilled 的新实例；
* 其他情况都会返回一个 pending 的新实例；

```js
Promise.any = function (promiseArr) {
  return new Promise((resolve, reject) => {
    if (promiseArr.length === 0) return;
    let errors = [];
    let rejectedCount = 0;
    promiseArr.forEach((p, i) => {
      Promise.resolve(p).then(
        (val) => {
          resolve(val);
        },
        (err) => {
          errors[i] = err;
          rejectedCount++;
          if (rejectedCount === promiseArr.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        }
      );
    });
  });
};
```

errors 是通过索引赋值来存储错误的（errors[i] = err），而不是用 push。
例如：
* 假设 promiseArr 有 3 个 Promise，索引为 0、1、2。
* 如果只有第 0 个和第 2 个 Promise 失败，那么 errors 会是 [err0, undefined, err2]。
* 此时 errors.length 是 3（因为最大索引是 2），但实际失败的 Promise 数量是 2。