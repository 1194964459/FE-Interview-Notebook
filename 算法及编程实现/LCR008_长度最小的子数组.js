/**
https://leetcode.cn/problems/2VG8Kg/

给定一个含有 n 个正整数的数组和一个正整数 target 
找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

示例1:
    输入：target = 7, nums = [2,3,1,2,4,3]
    输出：2
    解释：子数组 [4,3] 是该条件下的长度最小的子数组。

示例2：
    输入：target = 11, nums = [1,1,1,1,1,1,1,1]
    输出：0
 */

// 数组全是正数，可以用滑动窗口机制

var minSubArrayLen = function (target, nums) {
    let left = 0; // 窗口左边界
    let currentSum = 0; // 当前窗口的和
    let minLength = Infinity; // 最小长度，初始化为无穷大

    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right]; // 扩展窗口，加入当前元素

        // 当窗口和 >= target 时，尝试收缩左边界
        while (currentSum >= target) {
            // 更新最小长度：当前窗口长度为 right - left + 1
            minLength = Math.min(minLength, right - left + 1);
            // 收缩左边界，减去左元素的值
            currentSum -= nums[left];
            left++;
        }
    }

    // 若未找到符合条件的子数组，返回 0，否则返回最小长度
    return minLength === Infinity ? 0 : minLength;
};


let target = 7, nums = [2, 3, 1, 2, 4, 3]
console.log(minSubArrayLen(target, nums))

console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]))