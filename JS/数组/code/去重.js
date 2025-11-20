let arr = [5, '5', 5]


function unique(arr) {
    const map = new Map();
    const result = [];
    for (const item of arr) {
        // 若 Map 中无该元素，则添加到结果集和 Map
        if (!map.has(item)) {
            map.set(item, true);
            result.push(item);
        }
    }
    return result;
}

function unique2(arr) {
    let obj = {}
    const result = []
    for (const item of arr) {
        if (!obj[item]) {
            // if (!obj.hasOwnProperty(item)) {
            obj[item] = true
            result.push(item)
        }
    }
    return result
}

// function unique2(arr) {
//     const obj = {}; // 普通对象，有原型
//     const result = [];
//     for (const item of arr) {
//         // const key = typeof item === 'object' ? JSON.stringify(item) : item;
//         // 正确写法：hasOwnProperty（O 大写）
//         if (!obj.hasOwnProperty(item)) {
//             obj[item] = true;
//             result.push(item);
//         }
//     }
//     return result;
// }

// console.log(unique(arr))   // [ 5, '5' ]
console.log(unique2(arr))  // [ 5 ]
