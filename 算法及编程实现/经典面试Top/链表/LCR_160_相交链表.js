// https://leetcode.cn/problems/3u1WK4/description/

// 链表相交后，从某个节点之后的所有节点都是一样的
/**
高效解法采用双指针法，利用 “链表长度差” 的补偿机制：
    设指针 pA 从 headA 出发，指针 pB 从 headB 出发，同时遍历。
    当 pA 到达链表 A 尾部时，将其重定向到 headB 继续遍历；当 pB 到达链表 B 尾部时，将其重定向到 headA 继续遍历。
    若两链表相交，pA 和 pB 会在相交节点处相遇；若不相交，最终都会指向 null。
原理：两指针遍历的总长度均为 len(A) + len(B)，若有交点，必然在遍历过程中相遇（消除长度差影响）。
*/


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    // TODO:边界处理，任意链表为空则返回null
    if (!headA || !headB) {
        return null
    }
    let pA = headA, pB = headB
    while (pA != pB) {  // 这2个都是引用类型，引用类型
        pA = pA == null ? headB : pA.next   // TODO:这里将 headB写成pB了
        pB = pB == null ? headA : pB.next
    }
    return pA
};
