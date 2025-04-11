/**
 * 给定一个可能有重复数字的整数数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
candidates 中的每个数字在每个组合中只能使用一次，解集不能包含重复的组合。 

示例 1：
  输入：candidates = [10,1,2,7,6,1,5], target = 8
  输出：
    [
      [1,1,6],
      [1,2,5],
      [1,7],
      [2,6]
    ]
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  let res = []
  helper(candidates, 0, target, [], res);
  console.log(res);
};

function helper(nums, idx, target, zuhe, res) {
  if (target === 0) {
    res.push(zuhe.slice());
    return;
  }
  if (target < 0 || idx === nums.length) {
    return;
  }
  // TODO:若5不行的话，其实没必要遍历6，因为6肯定不行!!!  
  let lst = nums.findLastIndex(a => a === nums[idx])
  if (lst != -1) {

    zuhe.push(nums[idx]);
    helper(nums, idx + 1, target - nums[idx], zuhe, res);
    zuhe.pop();

    // 数字不重复
    if (lst === idx) {
      helper(nums, idx + 1, target, zuhe, res);
    }
    // 数字重复
    else {
      helper(nums, lst + 1, target, zuhe, res);  // TODO:此处是否应该return?
    }
  }
}

// let arr = [10, 1, 2, 7, 6, 1, 5], target = 8;
// let arr = [2, 5, 2, 1, 2], target = 5;
let arr = [2, 2, 2], target = 2;

combinationSum2(arr, target)


// sort后：[ 1, 1, 2, 5, 6, 7, 10 ]

/**
 * [ [ 1, 1, 6 ], [ 1, 2, 5 ], [ 1, 7 ], [ 1, 2, 5 ], [ 1, 7 ], [ 2, 6 ] ]
 * 
 * 避免重复的组合的方法是当在某一步决定跳过某个值为m的数字时，跳过所有值为m的数字:
 * 
 *    假设求[2，2，2]的组合，如果在处理第1个2时决定跳过它并跳过所有的2，那么得到的是一个空的组合。如果选择第1个2之后决定跳过第2个2并连带跳过后面的2，那么得到的是组合[2]​。如果选择前两个2之后决定跳过第3个2，那么得到的是组合[2，2]​。
 */