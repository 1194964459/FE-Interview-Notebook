// 冒泡排序：时间复杂度 n^2

function bubbleSort(arr) {
  const len = arr.length;

  // 交换多少轮
  for (let i = 0; i < len; i++) {
  
    // 每一轮遍历过程中的重复比较+交换
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([3, 6, 2, 4, 1]));
