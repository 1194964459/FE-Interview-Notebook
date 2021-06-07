/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
 var deleteNode = function(node) {
    // 无法访问删除节点的前一个节点，但是可以访问它之后的节点，将该节点的值替换为它之后节点的值，再删除他后面的节点，即可
    node.val = node.next.val
    node.next = node.next.next
};