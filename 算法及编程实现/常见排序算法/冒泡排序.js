/**
冒泡排序：
  通过相邻元素两两比较，将较大的元素逐步 “冒泡” 到数组的末端。每一轮遍历，都会把当前未排序部分的最大元素移动到已排序部分的开头

  添加一个标志位isSorted，来判断在某一轮比较中是否发生了元素交换。如果某一轮没有发生任何交换，说明数组已经有序，就可以直接退出排序过程。

时间复杂度 n^2

*/

function bubbleSort(arr) {
  const len = arr.length;

  // 交换多少轮
  for (let i = 0; i < len - 1; i++) {   // i 为什么是小于i-1？而不是i？ 因为最后一个元素不需要再和其他元素比较
    let isSorted = true; // 标志位，判断本轮是否有交换

    // 每一轮遍历过程中的重复比较+交换
    for (let j = 0; j < len - 1 - i; j++) {   // - i，已冒好的元素不需要比较了
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // 有交换，标记为false
        isSorted = false;
      }
    }
    if (isSorted) {
      break; // 本轮没有交换，数组已经有序，直接退出
    }
    // console.log(arr)
  }
  return arr;
}

bubbleSort([3, 6, 2, 4, 1])
