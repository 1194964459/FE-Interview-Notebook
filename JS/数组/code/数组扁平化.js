// 数组扁平化
// function flatter(arr){
//     if(!arr.length) return;
//     while(arr.some((item) => Array.isArray(item))){
        
//         // arr = [].concat(...arr)
//         arr = [].concat.apply([], arr)
//     }
//     return arr
// }

let b = [1,[2],3]
console.log('b: ', b)
console.log('扁平化处理', ...b)   // 
// flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]])