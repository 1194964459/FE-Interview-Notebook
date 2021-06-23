// 选择排序：时间复杂度 n^2

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
  