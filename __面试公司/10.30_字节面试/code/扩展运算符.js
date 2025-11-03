let myArray = {}
myArray['0'] = 'a'
myArray['1'] = 'b'
myArray.length = 2
console.log(Array.from(myArray))   // [ 'a', 'b' ]
console.log(...myArray)  // 报错，（扩展运算符使用时必须是可迭代对象才行，即部署了Symbol.iterator接口的对象才行，而myArray只是个普通对象）    