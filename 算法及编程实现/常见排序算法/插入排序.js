// 插入排序：时间复杂度 n^2

function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        let target = arr[j];
        
        while (j > 0 && arr[j - 1] > target) {
            arr[j] = arr[j - 1];
            j--;
        }
        
        arr[j] = target;
    }

    return arr;
}

console.log(insertSort([3, 6, 2, 4, 1]));
  