// https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
    // TODO:如果要删除的节点是头结点
    if (head && head.val == val) {
        return head.next
    }
    let prev = head;
    //  TODO:cur = head.next; 需考虑head的特殊性
    let cur = head ? head.next : null
    while (cur) {
        if (cur.val == val) {
            prev.next = cur.next
            break
        }
        // 未找到则移动指针
        prev = cur
        cur = cur.next
    }
    return head
};