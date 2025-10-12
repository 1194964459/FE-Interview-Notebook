// 选择排序：时间复杂度 n^2
/**
 * 
选择排序的核心思想是：
    将数组分为已排序区间和未排序区间。初始时，已排序区间为空，未排序区间是整个数组。
    每一轮从未排序区间中找到最小的元素，将其与未排序区间的 “第一个元素” 交换位置，此时该最小元素就进入了已排序区间，
    重复这个过程，直到未排序区间长度为 0，整个数组就有序了。

从0~n-1的位置上选一个最小值放在 下标为0的
...
从n—1到n...放在下标为n-1..   
 */

function selectSort(arr) {
    const len = arr.length;
    let minIndex;  // 缓存当前区间最小值的索引
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;

        for (let j = i; j < len; j++) {  // i、j分别定义当前区间的上下界

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) { // 如果 minIndex 对应元素不是目前的头部元素，则交换两者
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

console.log(quickSort([3, 6, 2, 4, 1]));
