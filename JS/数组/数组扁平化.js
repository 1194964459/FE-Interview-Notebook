// 数组扁平化
function flatter(arr){
    if(!arr.length) return;
    while(arr.some((item) => Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr
}

// let b = [1,[2],3]
// console.log('...', ...b) 
// console.log(':::', ...[1,2,3])
flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]])