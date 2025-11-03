console.log([].constructor === Array)   // true
console.log(typeof [] === 'array')  // false
console.log(typeof null === 'object')  // true
console.log('' instanceof String)
console.log('' instanceof Object) // false，原因：instanceof只能检测对象，''是个字符串（基本数据类型），所以返回false
console.log(new String('') instanceof Object); // true

console.log('====')
console.log(''.constructor)
console.log(''.__proto__)  // {}
console.log('====')



let str = 'a'   // 基本数据类型
let obj = new String('a')  // 字符串对象

console.log(str == obj)  // true
console.log(str === obj)  // false