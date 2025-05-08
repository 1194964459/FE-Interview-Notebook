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
 * 思路：
 *    f(i)表示从i个台阶往上爬的最小成本。
 * 假设一个楼梯有n个台阶（台阶从0开始计数，从第0级~第n-1级），由于一次可以爬1级或2级台阶，所以最终可能从n-1级或者n-2级台阶爬到楼梯顶部！即f（n-1）和f（n-2）的最小值就是这个问题的最优解。
 * 
 * 从第i级台阶往上爬的最少成本应该是从第i-1级台阶往上爬的最少成本和从第i-2级台阶往上爬的最少成本的较小值再加上爬第i级台阶的成本。这个关系可以用状态转移方程表示为f(i)= min[f(i-1),f(i-2)​]+cost[i]​。
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