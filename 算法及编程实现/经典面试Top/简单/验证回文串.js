// let s = "A man, a plan, a canal: Panama"
let s = "0P"
let arr = []
let str = s.toLowerCase()  // 返回一个新的字符串
for(let i = 0; i < str.length; i++){
    if((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z') || (str[i] >= '0' && str[i] <= '9')){
        arr.push(str[i])
    }
}
let str1 = arr.join('')
let str1_res = arr.reverse().join('')

if(str1 == str1_res){
    console.log('是 回文串')
}else{
    console.log('不是 回文串')
}