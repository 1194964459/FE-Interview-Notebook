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
    let len = nums.length
    let dp = new Array(len).fill(0);
    dp[0] = 1
    for (let i = 1; i < len; i++) {
        // Max.max(...dp.slice(0,i))
        let max = 0;
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (max < dp[j]) {
                    max = dp[j]
                }
            }
        }
        dp[i] = max + 1;
    }
    return Math.max(...dp)
};


let arr = [0, 3, 1, 6, 2, 2, 7]
lengthOfLIS(arr)
