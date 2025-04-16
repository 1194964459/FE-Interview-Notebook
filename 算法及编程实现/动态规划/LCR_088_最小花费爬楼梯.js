/**
 * 给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。

你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。

请你计算并返回达到楼梯顶部的最低花费。(TODO:顶楼的下标为arr.length， 需要把最后一个数组项的值消耗掉)

示例 1：
  输入：cost = [10,15,20]
  输出：15
  解释：你将从下标为 1 的台阶开始。 支付 15 ，向上爬两个台阶，到达楼梯顶部。总花费为 15 。

示例 2：
  输入：cost = [1,100,1,1,1,100,1,1,100,1]  // length = 10
  输出：6
  解释：你将从下标为 0 的台阶开始。
    - 支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。
    - 支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。
    - 支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。
    - 支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。
    - 支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。
    - 支付 1 ，向上爬一个台阶，到达楼梯顶部。
    总花费为 6 。
 */

/**
* @param {number[]} cost
* @return {number}
*/
var minCostClimbingStairs = function (cost) {
  let dp = new Array(cost.length).fill(0);
  dp[0] = cost[0];
  dp[1] = cost[1];

  for (let i = 2; i < cost.length; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
  }
  // console.log(dp);
  return Math.min(dp[cost.length - 1], dp[cost.length - 2]);  // 先爬到n-1层，或者n-2层

};

console.log(minCostClimbingStairs([10, 15, 20])); // 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6
console.log(minCostClimbingStairs([3, 1, 2])); //
console.log(minCostClimbingStairs([1, 2])); // 2

/**
 * [
      1, 100, 2,   3, 3,
      103,   4, 5, 104, 6
    ]
 */