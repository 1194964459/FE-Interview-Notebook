/**
https://leetcode.cn/problems/Ygoe9J/description/

给定一个无重复元素的正整数数组 candidates 和一个正整数 target ，找出 candidates 中所有可以使数字和为目标数 target 的唯一组合。

candidates 中的数字可以“无限制重复被选取”。如果至少一个所选数字数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的唯一组合数少于 150 个。

// 示例 1：
  输入: candidates = [2,3,6,7], target = 7
  输出: [[7],[2,2,3]]

// 示例 5：
输入: candidates = [1], target = 2
输出: [[1,1]]
 */


/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  candidates.sort((a, b) => a - b)
  let res = []

  helper(candidates, 0, target, [], res)
  console.log(res)
  return res;
};

function helper(nums, idx, target, zuhe, res) {
  if (target === 0) {
    res.push(zuhe.slice());
    return;
  }

  // target < 当前值cur，查找cur及以前的值， target >= 当前值cur，查找cur及以后的值
  if (idx === nums.length || target < nums[0]) {
    return;
  }

  // [2,3,6,7]
  zuhe.push(nums[idx]);
  helper(nums, idx, target - nums[idx], zuhe, res);
  zuhe.pop();

  helper(nums, idx + 1, target, zuhe, res);  //TODO:注意第2、3个参数，此处是target
}

combinationSum([2, 3, 6, 7], 7) // [[7],[2,2,3]]
// combinationSum([1], 2)// [[1,1]]
// combinationSum([1], 1)// [[1]]
// combinationSum([2], 1)// []

