/**
 * 二维数组去重
 */

// 测试结果
const matrix = [
  [1, 2, 3, 4],
  [3, 4, 5, 6],
  [1, 2, 3, 4]
]

// 法1：
const removeDuplicate = (matrix) => {
  return matrix.filter((item, index) => {
    let idx = matrix.findIndex((v) => {
      return JSON.stringify(v) === JSON.stringify(item)
    })
    console.log('序号：', idx)
    return idx === index
  })
}

// let res = removeDuplicate(matrix) // [ [ 1, 2, 3, 4 ], [ 3, 4, 5, 6 ] ]
// console.log(res)

// 法2：
const removeDuplicate2 = (matrix) => {
  let obj = {}
  matrix.filter((item) => {
    let key = item.join()
    return obj.hasOwnProperty(key) ? false : (obj[key] = true)
    // if (obj.hasOwnProperty(key)) {
    //   return false
    // }
    // obj[key] = true
    // return true
  })
  console.log('obj:', obj)
}
let res2 = removeDuplicate2(matrix) // [ [ 1, 2, 3, 4 ], [ 3, 4, 5, 6 ] ]
console.log(res2) 
