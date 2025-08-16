/**
 * 将手机号18379836654转化为183-7983-6654
 */

// let mobile = '18379836654'
// let reg = /(?=(\d{4})+$)/g

// console.log(mobile.replace(reg, '-'))

let price = '1234567890'  // 1-234-567-890
let priceReg = /(?=(\d{4})+$)/g   // ?=在用的时候，外面必须用()扩住



// let price = '123456789'  // -123-456-789,前面的空格位置也标记了
// let priceReg = /(?=(\d{3})+$)/g

console.log(price.replace(priceReg, '-')) // ,123,456,789