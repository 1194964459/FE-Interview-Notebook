// https://leetcode.cn/problems/QTMn0o/description/
// 给定一个整数数组和一个整数 k ，请找到该数组中和为 k 的连续子数组的个数。

// 数组中有负数


/**
 * 法1，暴力解法：超时了！！！！ TODO:
 * i表示数组的起始索引，从 0，...，n-1取值
 * j表示结束索引，从i，...，n-1取值
 * 从 i 到 j 累加元素，得到当前子数组的和。若为k..
 */
// var subarraySum = function (nums, k) {
//     let cnt = 0;
//     for (let i = 0; i < nums.length; i++) {
//         let curSum = 0;
//         for (let j = i; j < nums.length; j++) {
//             curSum += nums[j]
//             if (curSum == k) {
//                 cnt++
//             }
//         }
//     }
//     return cnt
// };


var subarraySum = function (nums, k) {
    const map = new Map();
    map.set(0, 1); // 初始化：前缀和为0的情况出现1次（用于处理子数组从0开始的情况）

    let currentSum = 0; // 当前前缀和
    let count = 0; // 符合条件的子数组个数

    for (const num of nums) {
        currentSum += num; // 计算当前前缀和

        // 若 currentSum - k 存在于map中，说明有对应子数组
        if (map.has(currentSum - k)) {
            count += map.get(currentSum - k);
        }

        // 将当前前缀和加入map，更新出现次数
        map.set(currentSum, (map.get(currentSum) || 0) + 1);
    }

    return count;
};

let nums = [1, 2, 3], k = 3  // 2
// let nums = [1, 1, 1], k = 2   // 2
// let nums = [1], k = 0

console.log(subarraySum(nums, k))
// console.log(subarraySum(nums, k))
// console.log(subarraySum(nums, k))

