console.log([1, 2, 3, 4, 5].splice(1, 2, 3, 4, 5))   // [ 2, 3 ]   
console.log([1, 2, 3, 4, 5].slice(1, 2, 3, 4, 5))  // [2]，注意：第2个索引是结束索引，后面的参数都会被忽略

let arr = [1, 2, 3, 4, 5]

let res = arr.splice(1, 2, 3, 4, 5)
console.log(res)  // [ 2, 3 ]，删除的元素
console.log(arr)  // [ 1, 3, 4, 5, 4, 5 ]

let arr2 = [1, 2, 3, 3]
arr2.splice(2)
console.log('arr2:', arr2)   // [ 1, 2 ]