// 经典面试题
console.log('foo' == new function () { return String('foo') })      // false
console.log('foo' == new function () { return new String('foo') })  // true  


// console.log(new function () { })   // {}
// console.log(new function () { return String('foo'); }) // {}
// console.log(new function () { return new String('foo') })  // [String: 'foo']
// console.log(new function () { this.b = 'b'; return String('foo') })   // { b: 'b' }


