/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    // TODO:创建虚拟头节点，简化边界处理
    let dummy = new ListNode(-1)
    let cur = dummy

    while (l1 && l2) {
        if (l1.val <= l2.val) {
            cur.next = l1
            l1 = l1.next
        } else {
            cur.next = l2
            l2 = l2.next
        }
        // 移动cur指针
        cur = cur.next
    }

    // TODO:现在可能还剩一个链表没遍历完
    cur.next = l1 ? l1 : l2
    return dummy.next
};