/**
 * 一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响小偷偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组 nums ，请计算 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

示例 1：
  输入：nums = [1,2,3,1]
  输出：4
  解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
      偷窃到的最高金额 = 1 + 3 = 4 。

示例 2：
  输入：nums = [2,7,9,3,1]
  输出：12
  解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
      偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 */

/**
* @param {number[]} nums
* @return {number}
*/
var rob = function (nums) {
  if (nums.length < 3) {
    return Math.max(...nums)
  }
  // dp[i]表示从标号为0的房屋开始到标号为i的房屋为止最多能偷取到的财物的最大值
  let dp = new Array(nums.length)

  dp[0] = nums[0]
  // dp[1] = nums[1]
  dp[1] = Math.max(nums[0], nums[1])   //TODO:

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }
  console.log(dp);
  // return Math.max(...dp)
  return dp[nums.length - 1]
};
// console.log(rob([1, 2, 3, 1]))
// console.log(rob([2, 7, 9, 3, 1]))
console.log(rob([2, 1, 1, 2]))

// console.log(rob([1, 2, 3]))