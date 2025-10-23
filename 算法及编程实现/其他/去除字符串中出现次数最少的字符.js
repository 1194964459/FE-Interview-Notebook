/**
https://y03l2iufsbl.feishu.cn/docx/U4oedI2CroBbi8xPVhzcQbk0nAh

去除字符串中出现次数最少的字符，不改变原字符串的顺序：若出现次数最少的字符有多个，则把出现次数最少的字符都删除。
    “ababac” —— “ababa”​
    “aaabbbcceeff” —— “aaabbb”
 */

let str1 = 'ababac'
let str2 = 'aaabbbcceeff'
function func(str) {
    let obj = {}
    for (let it of str) {
        obj[it] = (obj[it] || 0) + 1
    }
    let minNum = Math.min(...Object.values(obj))
    let arr = []  // 统计哪些字符出现的次数最少？
    for (let it in obj) {
        if (obj[it] == minNum) {  // TODO:为啥不能Obj.it这样访问？答：obj.it 会被解析为 obj 的 it 属性（实际不存在），而 obj[it] 才是访问变量 it 对应的属性
            arr.push(it)
        }
    }
    console.log(arr)
    let res = []
    for (let it of str) {
        if (!(arr.find(i => i == it))) {
            res.push(it)
        }
    }
    return res.join('')
}

console.log(func(str1))
console.log(func(str2))


