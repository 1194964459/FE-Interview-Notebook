// 深浅拷贝与解构赋值

// 1. 数组
let arr = [1, 2, 3]
// let arr_copy = [...arr, [arr]]
// console.log('arr, arr_copy', arr, arr_copy)

// arr[1] = 0
// console.log('--------------')
// console.log('arr, arr_copy', arr, arr_copy)

/**
 * 结论：
 * [arr]是浅拷贝（arr改变时，arr_copy也会改变）；
 * [...arr]是深拷贝（arr改变时，arr_copy不会改变）
 * 
 */


// 2. 对象

let obj = {
  a: 1,
  b: 2
}

let obj_copy = { ...obj }
console.log('obj,obj_copy', obj, obj_copy)

obj.a = 0
console.log('--------------')
console.log('obj,obj_copy', obj, obj_copy)

/**
 * 结论：对象也有与数组有类似的结论
 */