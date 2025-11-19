// 组合总和
function resolve(arr, target) {
    let res = []
    // sy：剩余的
    function helper(arr, i, sy, zuhe, res) {
        if (sy == 0) {
            // res.push(zuhe)
            res.push(zuhe.slice())

            return;
        }
        if (i == arr.length || sy < arr[0]) {
            return;
        }

        zuhe.push(arr[i])
        // helper(arr, i + 1, sy - arr[i], zuhe, res)
        helper(arr, i, sy - arr[i], zuhe, res)
        zuhe.pop()

        helper(arr, i + 1, sy, zuhe, res)
    }

    arr.sort((a, b) => a - b)
    helper(arr, 0, target, [], res)
    return res;
}

let candidates = [2, 3, 6, 7], target = 7
console.log(resolve(candidates, target))