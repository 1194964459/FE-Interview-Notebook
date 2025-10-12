# Promisify 实现

主要是将Node.js 回调风格 的函数转换为返回 Promise 的函数。


Node.js 风格的回调函数通常遵循以下模式：
```js
function callbackStyleFunction(arg1, arg2, callback) {
  // 异步操作...
  if (error) {
    return callback(error);
  }
  callback(null, result);
}
```

## 实现个简单的 Promisify
```js
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      // 调用原函数，并添加一个符合 Node 风格的回调
      fn(...args, (err, result) => {
        if (err) {
          reject(err); // 如果有错误，拒绝 Promise
        } else {
          resolve(result); // 如果成功，解析 Promise
        }
      });
    });
  };
}
```

使用：
```js
const fs = require('fs');

// 回调风格
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Content:', data);
});

// 使用 promisify 转换后
const readFile = promisify(fs.readFile);

// 现在可以使用 Promise 语法
readFile('file.txt', 'utf8')
  .then(data => console.log('Content:', data))
  .catch(err => console.error('Error:', err));

// 或者使用 async/await
async function read() {
  try {
    const data = await readFile('file.txt', 'utf8');
    console.log('Content:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}
```