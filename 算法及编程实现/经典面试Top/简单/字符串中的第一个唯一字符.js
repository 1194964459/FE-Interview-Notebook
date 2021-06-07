// let s = "loveleetcode"
let s = 'aadb'

let arr = s.split('')
let obj = {}
for(let i = 0; i < arr.length; i++){
    if(!obj[arr[i]]){
        obj[arr[i]] = 1
    }else{
        obj[arr[i]]++
    }
}

let keys = Object.keys(obj).filter((item) =>{
    return obj[item] == 1
})
let min = arr.length - 1, index

if(keys.length == 0) return -1
if(keys.length == 1) return arr.indexOf(keys[0])

for(let j = 0; j < keys.length; j++){
    index = arr.indexOf(keys[j])
    if(index < min){
        min = index
    }
}
let a =  min;
console.log('a： ', a)