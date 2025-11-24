const arr = [3, 1, 2, 2, 5, 3];

function resolve(arr) {
    let map = new Map()
    let idx = 0
    for (let it of arr) {
        if (!map.has(it)) {
            // map.set(idx) = it  // TODO:语法错误❌
            map.set(it, true)

            arr[idx] = it
            idx++
        }
    }
    arr.length = idx
    return arr
}

console.log(resolve(arr))