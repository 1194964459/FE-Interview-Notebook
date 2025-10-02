/** 
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。


你能将算法的时间复杂度降低到 O(n log(n)) 吗?
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    let len = nums.length - 1
    // if (nums.length >= 1) {
    //     max = 1
    // }
    let dp = []
    for (let i = len; i >= 0; i--) {
        if (!dp.length) {  // 最后一项
            dp.push(1)
        } else {
            /**
             * arr[i+1, ..., len]中的最大值
             */

        }
    }
};