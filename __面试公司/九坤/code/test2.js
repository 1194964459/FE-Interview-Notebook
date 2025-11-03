const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

console.log(obj.hasOwnProperty(1))
console.log(obj.hasOwnProperty('1'))
console.log(set.has(3))
console.log(set.has('3'))


// true
// true
// true
// false

// Set 存储的是 原始值本身
// hasOwnProperty，JS 对象的 属性键（key）会被强制转换为字符串（除了 Symbol 类型）。