// Object 的非 Symbol 键名会被强制转为字符串，导致 5 和 '5' 视为同一个键；

const obj = {};
obj[5] = 'hello';
obj['5'] = 'ooo'
obj[5] = 'hello';

console.log(obj['5']); // 输出 'hello'
console.log(obj[5]); // 输出 'hello'
// console.log(obj.5); // 语法错误，因为属性名不能以数字开头，必须用方括号访问

