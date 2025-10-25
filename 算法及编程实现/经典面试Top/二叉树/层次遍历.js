/**
https://leetcode.cn/problems/binary-tree-level-order-traversal/description/
 
从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。
例如：给定二叉树: [3,9,20,null,null,15,7]
 
    3
   / \
  9  20
    /  \
   15   7

层次遍历返回结果：
[
  [3],
  [9,20],
  [15,7]
]
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) return [];  // 空树直接返回空数组

    const result = [];
    const queue = [root];  // 初始化队列，存入根节点

    // TODO:
    while (queue.length > 0) {
        const levelSize = queue.length;  // 当前层节点数量
        const currentLevel = [];         // 存储当前层节点值

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();  // 取出队首节点
            currentLevel.push(node.val);

            // 左子节点存在则入队
            if (node.left) queue.push(node.left);
            // 右子节点存在则入队
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);  // 将当前层加入结果
    }

    return result;
};
