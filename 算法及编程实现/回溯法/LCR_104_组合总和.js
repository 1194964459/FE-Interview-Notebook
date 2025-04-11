/**
 * LCR 104. 组合总和 Ⅳ

给定一个由 不同 正整数组成的数组 nums ，和一个目标整数 target 。请从 nums 中找出并返回总和为 target 的元素组合的个数。数组中的数字可以在一次排列中出现任意次，但是顺序不同的序列被视作不同的组合。 

示例 1：
  输入：nums = [1,2,3], target = 4
  输出：7，所有可能的组合为：
    (1, 1, 1, 1)
    (1, 1, 2)
    (1, 2, 1)
    (1, 3)
    (2, 1, 1)
    (2, 2)
    (3, 1)
    请注意，顺序不同的序列被视作不同的组合。

示例 2：
  输入：nums = [9], target = 3
  输出：0
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  let res = [];
  helper(nums, target, zuhe, res);
  console.log(res);
  return res.length;
};

function helper(nums, target, zuhe, res) {
  if (target === 0) {
    res.push(zuhe.slice());
    return;
  }

  if (target < 0) {
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    zuhe.push(nums[i]);
    helper(nums, target - nums[i], zuhe, res);
    zuhe.pop();
  }
}