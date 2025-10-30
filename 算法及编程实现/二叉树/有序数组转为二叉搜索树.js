/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
 var sortedArrayToBST = function(nums) {
    return buildBST(nums, 0, nums.length-1) // 递归的入口
};

var buildBST = function(nums, start, end){
    if(start > end){   // 构成不了区间，返回null
        return null;  
    }
    let midIndex = (end + start) >>> 1  // 向右移1位，相当于是除以2

    let root = new TreeNode(nums[midIndex])

    root.left = buildBST(nums, start, midIndex-1)
    root.right = buildBST(nums, midIndex+1, end)

    return root;
}