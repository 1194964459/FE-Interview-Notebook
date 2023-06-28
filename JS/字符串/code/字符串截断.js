/**
 * 字符串几种截断方法比较：
 * 1. slice(start, end): start、end可为负数；
 * 2. substring(from, to): from、to 为非负数；
 * 3. substr(start, length): 从 start 下标开始的指定数目的字符; ECMAscript 没有对该方法进行标准化，因此反对使用它。
 * 
 * 三者是否会改变原数组？
 * 参数是否可为负数？
 * 非标准化是啥意思？
 */

let str = 'abcdefgh'

// slice 不改变原数组
let sub_str1 = str.slice(1, 3)  // bc
let sub_str11 = str.slice(-1) // ''
console.log('str:', str, '\nsub_str: ', sub_str1, '\nsub_str11: ', sub_str11, '\ntypeof: ', typeof sub_str11, '\n')

// substr 该方法被弃用了
let sub_str2 = str.substr(1, 3)  // bcd
let sub_str21 = str.substr(-1) // h
console.log('str:', str, '\nsub_str: ', sub_str2, '\nsub_str11: ', sub_str21, '\n')

let sub_str3 = str.substring(1, 3) // bc
let sub_str31 = str.substring(-1) // abc
console.log('str:', str, '\nsub_str: ', sub_str3, '\nsub_str11: ', sub_str31)
