/**
 * 打家截舍（环形）
 * 一个专业的小偷，计划偷窃一个环形街道上沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

给定一个代表每个房屋存放金额的非负整数数组 nums ，请计算 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。

示例 1：
  输入：nums = [2,3,2]
  输出：3
  解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

示例 2：
  输入：nums = [1,2,3,1]
  输出：4
  解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
      偷窃到的最高金额 = 1 + 3 = 4 。

示例 3：
输入：nums = [0]
输出：0
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length < 2) {
    return nums[0]
  }
  /**
   * 思路：
   *    0、n-1的房屋不能同时去：
   *        因此，可以将这个问题分解成两个子问题：一个问题是求小偷从标号为0开始到标号为n-2结束的房屋内能偷得的最多财物数量，另一个问题是求小偷从标号为1开始到标号为n-1结束的房屋内能偷得的最多财物数量。
   */
  const res1 = helper(nums.slice(1))
  const res2 = helper(nums.slice(0, nums.length - 1))
  return Math.max(res1, res2)
};

function helper(nums) {
  if (nums.length < 3) {
    return Math.max(...nums)
  }
  let dp = new Array(nums.length)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }
  return dp[dp.length - 1]
}

// console.log(rob([2, 3, 2]));
// console.log(rob([1, 2, 3, 1]));
console.log(rob([0]));
console.log(rob([0, 1]));

// console.log(rob([200, 3, 140, 20, 10]))
// console.log(rob([10, 3, 140, 20, 200]))
// console.log(rob([1, 2, 1, 1]))  // [1,2,2,3]
// console.log(rob([2, 7, 9, 3, 1]))