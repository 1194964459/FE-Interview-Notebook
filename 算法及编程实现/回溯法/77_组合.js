/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
   
   你可以按 任何顺序 返回答案

示例 1：

输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]

示例 2：

输入: n = 1, k = 1
输出: [[1]]
 * 
 */
function helper(nums, idx, k, zuhe, res) {
  if (zuhe.length === k) {
    res.push(zuhe.slice());
    return;
  }
  if (idx === nums.length) {
    return;
  }

  zuhe.push(nums[idx]);
  helper(nums, idx + 1, k, zuhe, res);
  zuhe.pop();

  helper(nums, idx + 1, k, zuhe, res);
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // 子集与组合解法类似

  // 基于1个整数，创建该数值以内的数组  TODO:
  let arr = Array.from({ length: n }, (_, i) => i + 1)
  // console.log(arr);

  let res = [];
  helper(arr, 0, k, [], res);
  console.log(res);
};

combine(4, 2); // [[2,4],[3,4],[2,3],[1,2],[1,3],[1,4]]
// combine(1, 1); // [[1]]