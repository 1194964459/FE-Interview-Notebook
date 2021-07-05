// 大数相加
let a = "9007199254740991";
let b = "1234567899999999999";

/**
 * 思想：查找两个数的最大长度，长度小的以0填充
 */
function add(a ,b){
    let maxLength = Math.max(a.length, b.length)
    a = a.padStart(maxLength, 0)
    b = b.padStart(maxLength, 0)
 
    let t = 0
    let f = 0  //进位
    let sum = ''
    for(let i = maxLength - 1; i>=0; i--){
        t = parseInt(a[i]) + parseInt(b[i]) + f
        f = Math.floor(t / 10);
        sum = t % 10 + sum;
    }

    // 最后可能还有进位
    if(f != 0){
        sum = '' + f + sum
    }
    console.log(typeof sum) // string 
    return sum;  
}

let res = add(a, b)

console.log(res)