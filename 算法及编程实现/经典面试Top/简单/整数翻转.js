// 样例数据
let x = 123

// 判断是正数？还是负数
let flag = false  // 标记正负值
if(x < 0){
    flag = true
    x =  Math.abs(x)
}
// 法1 
let num = 0
while (x){
    num = num * 10 + x % 10
    x = Math.floor(x / 10)
}
// 法2：
// let arr =  ('' + x).split('').reverse()
// let num = Number(arr.join(''))

// 法3：
// let arr =  ('' + x).split('')
// let len = arr.length
// for(let i = 0; i < len/2; i++){
//     let num_j = arr[len-1-i]
//     arr[len-1-i] = arr[i]
//     arr[i] = num_j
// }
// let num = Number(arr.join(''))

if(flag) num = -num
// 判断翻转后的数字大小
if((num < Math.pow(2,31)-1) && num > -Math.pow(2,31)){
    return num;
}else{
    return 0;
}