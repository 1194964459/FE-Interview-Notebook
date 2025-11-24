// 大数相加
let a = "9007199254740991";
let b = "1234567899999999999";

/**
 * 思想：
 *    将“大数相加”转变为数字不同位（个、十、百）的字符串拼接
 * 
 * 基本步骤：
 * 1. 将两个大数的位数对齐，位数不够的以0填充（padStart()）
 * 2. 循环迭代每一位上的数字字符串（含进位）
 * 3. 最终结果，考虑sum经迭代后仍为''、进位位数不为0的特殊情况
 */
function add(a, b) {
    let maxLength = Math.max(a.length, b.length)
    // str.padStart(targetLength [, padString]), 目标字符串长度为targetLength，若不够的话，用padString填充
    a = a.padStart(maxLength, 0)
    b = b.padStart(maxLength, 0)

    let t = 0
    let f = 0  //进位
    let sum = ''
    for (let i = maxLength - 1; i >= 0; i--) {
        t = parseInt(a[i]) + parseInt(b[i]) + f
        f = Math.floor(t / 10);
        sum = t % 10 + sum;
    }

    // 最后可能还有进位
    if (f != 0) {
        sum = '' + f + sum
    }
    console.log(typeof sum) // string 
    return sum;
}

let res = add(a, b)

console.log(res)

