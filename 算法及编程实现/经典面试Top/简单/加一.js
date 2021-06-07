// let digits = [4,3,2,9]
// let digits = [1,2,3]
// let digits = [9,9]
let digits = [9,8,7,6,5,4,3,2,1,0]


let arr = [],i = 0
let flag = 0
for(let i=digits.length-1; i>=0; i--){
    let val = digits[i]
    if(val<9){
        if(i==digits.length-1){
            arr.unshift(val+1)
        }else if(flag>0){
            arr.unshift(val+1)
            flag--
        }else{
            arr.unshift(val)
        }
    }else{
        if(i=digits.length-1){
            // ++val
            arr.unshift(0)
            flag++
        }else{
            if(flag>0){
                if(i==0){
                    arr.unshift(0)
                    arr.unshift(1)
                }else{
                    arr.unshift(0)
                }
            }else{
                arr.unshift(val)
            }
        }
        
        // 最后一位，肯定会加1的
        // 有进位，是第一位的话，是10；否则是0
        // 没有进位，原来的数字

    }
}

console.log('arr: ', arr)