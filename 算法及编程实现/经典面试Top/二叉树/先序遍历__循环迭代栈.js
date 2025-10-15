function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


function preorderTraversal(root) {
    let res = []
    if (!root) return res;

    let stack = []   // 后进先出，若是先序遍历的话 需要先遍历右子树
    stack.push(root)

    while (stack.length > 0) {
        const node = stack.pop();
        res.push(node.val)

        if (node.right) {
            stack.push(node.right)
        }
        if (node.left) {
            stack.push(node.left)
        }
    }

    return res;
}

// 创建一个简单的二叉树
const root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(3);

const result = preorderTraversal(root);
console.log(result);
// 输出: [1, 2, 3]