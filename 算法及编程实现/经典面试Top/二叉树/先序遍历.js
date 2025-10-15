function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function preorderTraversal(root) {
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