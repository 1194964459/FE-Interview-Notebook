// 参考：https://blog.csdn.net/nrsc272420199/article/details/82587933


let nums = [5,2,3,1]

var sortArray = function(nums) {
    // 基于快速排序
    function quickSort(nums, low, high){
        if(low < high){
            let lownIndex = getIndex(nums, low, high)
            quickSort(nums, low, lownIndex-1)
            quickSort(nums, lownIndex + 1, high)
        }
        return nums
    }

    function getIndex(arr, low, high){
        let tmp = arr[low]
        while(low < high){
            // 查找比 tmp 小的数
            while(low < high && arr[high] >= tmp){
                high--
            }
            arr[low] = arr[high]

            // 查找比 tmp 大的数
            while(low < high && arr[low] <= tmp){
                low++
            }
            arr[high] = arr[low]
        }
        // low == high
        arr[low] = tmp
        return low
    }

    return quickSort(nums, 0, nums.length-1)
};


let res = sortArray(nums)
console.log('res: ', res)