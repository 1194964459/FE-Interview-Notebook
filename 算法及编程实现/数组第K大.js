var findKthLargest = function(nums, k) {
    let arr = nums.sort((a, b)=>{
        return b - a
    })

    return arr[k-1]  
};
var arr = [1]
k = 1
let res = findKthLargest(arr, 1)
console.log('第k大元素是：', res)