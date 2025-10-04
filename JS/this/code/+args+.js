let arr = [1, 2]
let a = '' + arr
console.log(a, typeof a)

let b = '' + arr + ''   // 与 '' + arr  一样的效果
console.log(b, typeof b)

let c = arr.toString()
console.log(c)   // 1,2 

console.log(arr.toString() === '' + arr)  // true