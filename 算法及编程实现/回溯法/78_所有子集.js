// 采用回溯法解决问题时如果到达树形结构的叶节点，就找到了问题的一个解。采用回溯法解决问题的过程实质上是在树形结构中从根节点开始进行深度优先遍历。

/**
 * 输入一个不含重复数字的数据集合，请找出它的所有子集
 * 
 * 解法：参考”回溯法“， 剑指Offer
 */

/**
 * 输入：nums = [0]
   输出：[[],[0]]

   输入：nums = [1,2,3]
   输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */

/**
 * 
 * @param {*} nums: Array
 * @param {*} idx
 * @param {*} subset: 子集 
 * @param {*} res: 结果  
 */
function helper(nums, idx, subset, res) {
  // 叶子节点
  if (idx === nums.length) {
    res.push(subset.slice()); // 注意这里要用slice()，否则subset会被pop()清空
  } else if (idx < nums.length) {
    // 选当前元素
    subset.push(nums[idx]);
    helper(nums, idx + 1, subset, res);
    subset.pop();

    // 不选当前元素
    helper(nums, idx + 1, subset, res);
  }
}

function subsets(nums) {
  let result = []
  if (nums.length === 0) {
    result.push([]);
  }
  helper(nums, 0, [], result);
  return result;
}

// let arr = [1, 2, 3];
let arr = [1, 2];
const res = subsets(arr);

console.log('所有子集：', res);