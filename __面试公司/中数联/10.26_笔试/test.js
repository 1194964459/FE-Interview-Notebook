// let tokens = line.split(' ');
let tokens = '0xABCD'
// ABCD
// let i+;
// if (i > 1) {
// let num = parseInt(tokens[0]);
let num = parseInt(tokens, 16).toString(8)
console.log(num)

let res = tongji(num)
console.log(res)
// console.log(parseInt('0xAA', 16).toString(8))


function hexToOctal(num) {
    return parseInt(num, 16).toString(8)
}
function tongji(num) {
    let obj = {}
    let arr = num.split('')
    for (let it of arr) {
        obj[it] = (obj[it] || 0) + 1
    }
    // obj.sort((a,b)=>a-b)
    let max = Math.max(...Object.values(obj))
    let res = []
    for (let it in obj) {
        if (obj[it] == max) {
            res.push(it)
        }
    }
    return res.join(' ')
}