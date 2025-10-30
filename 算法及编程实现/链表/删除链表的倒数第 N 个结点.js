// 给定一个链表，移除该链表中倒数第N个节点，并返回新的链表，链表中的长度为 length

// 1 <= length <= 100
// 0 <= Node.val <= 100
// 1 <= n <= length

// 示例1
// 输入：head = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], n = 5
// 输出：[1, 2, 3, 4, 5, 7, 8, 9, 10]



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val);
 *     this.next = (next===undefined ? null : next);
 * }
**/
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode} 
**/
var removeNthFromEnd = function (head, n) {
    // write your code here.
    let cur = head
    let i = 0, j = 0
    while (cur) {
        i++
        cur = cur.next
    }
    cur = head

    let prev = head
    while (cur) {
        cur = cur.next
        j++
        if (j == i - n - 1) {
            cur.next = cur.next.next
            return head;
        }
    }
};