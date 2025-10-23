/**
 * TODO:一定要将基准值从原数组删掉！！！
 */
function quickSort(arr) {
    // 递归终止条件：数组长度 ≤ 1
    if (arr.length <= 1) return arr;

    const pivotIndex = Math.floor(arr.length / 2); // 选中间元素为基准（避免极端情况）
    const pivot = arr.splice(pivotIndex, 1)[0]; // 取出基准值，从原数组删除

    const left = []; // 存放小于基准的元素
    const right = []; // 存放大于基准的元素

    // 遍历数组，按基准值分割
    for (const item of arr) {
        item < pivot ? left.push(item) : right.push(item);
    }

    // 递归排序左右子数组，再与基准值合并
    return quickSort(left).concat(pivot, quickSort(right));
}

// let nums = [5, 2, 3, 1]
let nums = [3, 6, 2, 4, 1]

let res = quickSort(nums)
console.log(res)