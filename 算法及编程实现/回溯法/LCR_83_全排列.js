/**
 * 给定一个不含重复数字的整数数组 nums ，返回其 所有可能的全排列 。可以 按任意顺序 返回答案。

示例：
  输入：nums = [1,2,3]
  输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */

// 非常适合回溯法：分成n步，每一步都有n种选择！
// 提示：第一步有n种选择，第二步有n-1种选择，第三步有n-2种选择，...，第n步有1种选择

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let res = [];
  // 时间复杂度
  helper(nums, 0, [], res);
  console.log(res);
};

function helper(nums, idx, pailie, res) {
  if (pailie.length === nums.length) {
    res.push(pailie.slice());
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    if (pailie.includes(nums[i])) {
      continue;
    }
    pailie.push(nums[i]);
    helper(nums, idx + 1, pailie, res);

    // 回溯法：撤销选择（即回到父节点时需要清除之前的修改）；
    // 通常，回溯法的深度优先遍历用递归实现
    pailie.pop();
  }
}


permute([1, 2, 3]); 