let strs = ["flower","flower","flower","flower"]

let commonStr = strs[0];

for(let i = 1; i < strs.length; i++){
    // 先判断前两个是否有公共串，再将公共串与第三个进行比较...
    if(!commonStr){
        // return ''
        console.log('')
    }
    commonStr =  getCommonStr(commonStr, strs[i])

    // if(i == strs.length - 1) return commonStr;
    if(i == strs.length - 1) console.log('公共前缀: ', commonStr)
}



function getCommonStr(commonStr, str){
    let res = '', i = 0
    let minLen = Math.min(commonStr.length, str.length)
    while(i < minLen){
        if(commonStr[i] == str[i]){
            res = res + str[i]
            i++
        }else{
            break
        }
    }
    console.log('前缀：', res)
    return res;
}


