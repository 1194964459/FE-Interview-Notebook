// 二叉树的结构：
//     1
//    / \
//   2   3
//  / \
// 4   5


// const tree = {
//     val: 1,
//     left: {
//         val: 2,
//         left: { val: 4 },
//         right: { val: 5 }
//     },
//     right: { val: 3 }
// };
// console.log(preOrder(tree)); // 输出: [1, 2, 4, 5, 3]


function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function preOrder(root) {
    const result = [];
    function traverse(node) {
        if (node) {
            result.push(node.val);
            traverse(node.left);
            traverse(node.right);
        }
    }
    traverse(root);
    return result;
}