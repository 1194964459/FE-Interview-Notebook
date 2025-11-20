function preOrder(order) {
    let result = []

    function dfs(node) {
        if (!node) return;

        result.push(node.val)
        if (node.left) dfs(node.left)
        if (node.right) dfs(node.right)
    }
    return result
}