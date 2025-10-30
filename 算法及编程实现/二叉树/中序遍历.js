/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var inorderTraversal = function (root) {
    let res = []

    let traverse = (node) => {
        if (!node) return;

        traverse(node.left)
        res.push(node.val)
        traverse(node.right)
    }
    traverse(root)

    return res;
}
