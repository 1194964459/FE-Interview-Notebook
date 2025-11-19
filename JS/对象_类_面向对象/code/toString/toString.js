// null、undefined调用toString时会报错
// console.log(null.toString())  
// console.log(undefined.toString())
let a = {}
let b = [1, 2, 3]
let c = '123'
let d = function () { console.log('fn') }


console.log(a.toString())   // TODO:'[object Object]'
console.log(c.toString())   // '123'
console.log(d.toString())   // 'function(){ console.log('fn') }'

console.log([2, 3].toString())   // '2,3'
console.log(Object.prototype.toString.call([2, 3]))  // [object Array]

// 结论：若是对象的话，输出的是'[object Array]'格式
