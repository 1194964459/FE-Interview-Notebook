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
3个数组：

 */
function levelOrder(root) {
    if (!root) return []
    let queue = [root]
    let result = []  // 存结果

    while (!queue.length > 0) {
        let currentLevel = []
        let levelSize = queue.length

        // for (let i = 0; i < currentLevel.length; i++) 
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift()
            currentLevel.push(node.val)

            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }

        result.push(currentLevel)
    }

}