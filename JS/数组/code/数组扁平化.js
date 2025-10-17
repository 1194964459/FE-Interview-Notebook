// // 数组扁平化
function flatter(arr) {
    if (!arr.length) return;
    while (arr.some((item) => Array.isArray(item))) {

        arr = [].concat(...arr)
        // arr = [].concat.apply([], arr)
    }
    return arr
}

let b = [1, 2, [1, [2, 3, [4, 5, [6]]]]]
let res = flatter(b)
console.log(res)


// function flatten(arr) {
//     while (arr.some((item) => Array.isArray(item))) {
//         arr = [].concat(...arr)
//     }
//     return arr
// }

// let arr = [1, 2, [3, 4], [5, [6, 7]]]
// console.log(flatten(arr))