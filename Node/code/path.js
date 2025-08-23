const path = require('path');

// 示例 1: 解析相对路径
console.log(path.resolve('foo/bar', '/tmp/file/')); // 输出: /tmp/file
console.log(path.resolve('/foo/bar', '/tmp/file/')); // 输出: /tmp/file
console.log(path.resolve('foo/bar', 'baz')); // 输出: /Users/yanglixia/Documents/FE-Interview-Notebook/foo/bar/baz

console.log(path.resolve('/foo/bar', './baz')); // 输出: /foo/bar/baz
console.log(path.resolve('/foo/bar', '../baz')); // 输出: /foo/baz

// 示例 2: 使用当前工作目录
console.log(path.resolve('foo/bar')); // 输出: /Users/yanglixia/Documents/FE-Interview-Notebook/foo/bar

console.log('-------')
const dirPath = path.resolve(__dirname, 'data');
console.log(dirPath); // 输出:/Users/yanglixia/Documents/FE-Interview-Notebook/Node/code/data

const resolvedPath = path.resolve('/foo/bar', './baz', '../qux');
console.log(resolvedPath); // 输出: /foo/bar/qux

console.log(path.resolve('/foo/bar', './baz', '/qux')); // 输出: /qux