/**
 * 缺点：会改变数组的原始顺序，
 */
function inPlaceUnique(arr) {
    if (arr.length <= 1) return arr;
    // 1. 先排序（改变原数组顺序）
    arr.sort((a, b) => a - b);

    // 2. 快、慢双指针：当快、慢指针所指元素不同时，移动并更新慢指针
    let slow = 0;
    for (let fast = 1; fast < arr.length; fast++) {
        // 若当前元素与前一个不同，覆盖到 slow 的下一个位置
        if (arr[fast] !== arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    // 截断数组，保留前 slow + 1 个元素
    arr.length = slow + 1;
    return arr;
}

// 示例
const arr = [3, 1, 2, 2, 5, 3];
inPlaceUnique(arr);
console.log(arr); // [1, 2, 3, 5]