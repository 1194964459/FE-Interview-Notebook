/**
 * 给定一个可包含重复数字的整数集合 nums ，按任意顺序 返回它所有不重复的全排列。

示例 1：
  输入：nums = [1,1,2]
  输出：
    [[1,1,2],
    [1,2,1],
    [2,1,1]]
 * 
 */

/**
* @param {number[]} nums
* @return {number[][]}
*/
var permuteUnique = function (nums) {
  nums.sort((a, b) => a - b);
  let res = [];

  // 每个元素只能使用一次，记录该项元素是否使用过？？TODO:
  // const vis = Array.from({ length: nums.length }, () => false);
  const vis = new Array(nums.length).fill(false);

  const helper = (idx, pailie, res) => {
    if (pailie.length === nums.length) {
      res.push(pailie.slice());
      return;
    }

    // nums = [1,1,2] 
    // 每次都是从第一个元素开始遍历
    // 1. 如果当前元素已经使用过，则跳过
    // 2. 如果当前元素和前一个元素相同，且前一个元素没有使用过，则跳过    
    // 3. 如果当前元素和前一个元素相同，且前一个元素已经使用过，则可以使用当前元素
    // 4. 如果当前元素和前一个元素不同，则可以使用当前元素    
    for (let i = 0; i < nums.length; i++) {
      if (vis[i] || i > 0 && nums[i] === nums[i - 1] && !vis[i - 1]) {
        continue;
      }
      vis[i] = true;
      pailie.push(nums[i]);
      helper(idx + 1, pailie, res);

      vis[i] = false;
      pailie.pop();
    }
  }


  helper(0, [], res);
  console.log(res);

  return res;
};



/**
 * 二维数组去重
 */
// function removeDuplicates(nums) {
//   return nums.filter((item, index) => {
//     return nums.findIndex((num) => {
//       return JSON.stringify(num) === JSON.stringify(item);
//     }) === index
//   });
// }

permuteUnique([1, 1, 2]); // [[1,1,2],[1,2,1],[2,1,1]]

/**
 * [1,1,1,2] 
 * [1,1,2,1]
 * [1,2,1,1]
 * [2,1,1,1]
 */

/**
 * [1,1,2,2]
 * [1,2,1,2]
 * [1,2,2,1]
 * [2,1,1,2]
 * [2,1,2,1]
 * [2,2,1,1]
 */
