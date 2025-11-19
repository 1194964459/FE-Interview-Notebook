
let c = [1, 2, 3]
let d = { a: 2 }
Object.prototype.toString = function () {
    console.log('Object')
}
Array.prototype.toString = function () {
    console.log('Array')
    return this.join(',')   // 返回toString的默认值（下面测试）
}
Number.prototype.toString = function () {
    console.log('Number')
}
String.prototype.toString = function () {
    console.log('String')
}
/**
    什么时候会自动调用toString()?
    答：如果其中一边为对象，则会先调用toSting方法，也就是隐式转换，然后再进行操作。
 */

// 下面这3个都是基本类型，不会自动调起toString
console.log(2 + 1)  // 3
console.log('s')    // 's'
console.log('s' + 2)  // 's2'

console.log(c < 2)  // false        (一次 => 'Array')
// Array
// false

console.log(c + c)  // "1,2,31,2,3" (两次 => 'Array')
// Array
// Array
// 1,2,31,2,3

console.log(d > d)  // false        (两次 => 'Object')
// Object
// Object
// false

