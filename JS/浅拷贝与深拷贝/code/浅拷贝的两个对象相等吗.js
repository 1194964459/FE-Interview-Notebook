let arr = [1, 2]

let arr2 = arr

let arr3 = [1]
console.log(arr == arr2)   // true
console.log(arr === arr2)  // true
console.log(arr != arr2)  // false
console.log(arr === arr3)  // false


let arr4 = arr.concat() // 返回一个不同于arr的新数组
console.log(arr4)  // [ 1, 2 ]
console.log(arr4 == arr)  // false，两者引用地址不同


const obj = { name: 'a' };
console.log('obj.toString():', obj.toString())  //  "[object Object]""

console.log('arr.toString():', arr.toString())  // "1,2"
console.log('JSON.stringify(arr):', JSON.stringify(arr))   // "[1,2]"

const arr_r = [1, [2, 3]]
console.log('arr_r.toString():', arr_r.toString())  // "1,2,3"

const arr_r_r = [1, [2, [3, 4, [5]]]]
console.log('arr_r_r.toString():', arr_r_r.toString())  // "1,2,3,4,5"

const arr_r2 = [1, 2, 'sr', {}]
console.log('flat:', arr_r2.flat())


arr_r2.forEach(it => {
    console.log(it, typeof it)
})

/***
 * 
1 number
2 number
sr string
{} object

 */