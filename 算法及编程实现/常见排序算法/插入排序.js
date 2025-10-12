// 插入排序：时间复杂度 n^2
/**
插入排序的核心思想是：
    1. 将数组分为已排序区间和未排序区间。
    2. 初始时，已排序区间只有数组的第一个元素，未排序区间是从第二个元素开始的剩余部分。
    3. 每次从未排序区间取出一个元素，在已排序区间中从后往前扫描，找到合第一个比 target 小的元素所在的位置，并将该位置及之后的已排序元素依次后移，腾出位置插入 target。
    4. 重复这个过程，直到未排序区间的元素全部处理完毕，整个数组就变得有序了。
 */
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        let target = arr[j];

        // 找targey的最终位置：从后往前遍历 比target大的元素往后移
        while (j > 0 && (arr[j - 1] > target)) {
            arr[j] = arr[j - 1];
            j--;
        }

        // 找到位置后将所属位置的值设为target
        arr[j] = target;

        console.log(arr)
    }

    return arr;
}

console.log(insertSort([3, 2, 6, 4, 1]));


// [ 2, 3, 6, 4, 1 ]
// [ 2, 3, 6, 4, 1 ]
// [ 2, 3, 4, 6, 1 ]
// [ 1, 2, 3, 4, 6 ]
// [ 1, 2, 3, 4, 6 ]