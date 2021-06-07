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
 var mergeTwoLists = function(l1, l2) {
    let head = new ListNode(-1) //head为头指针，指向后面的头结点
    let res = head

    while(l1 && l2){
        if(l1.val <= l2.val){
            res.next = l1
            l1 = l1.next
        }else{
            res.next = l2
            l2 = l2.next
        }
        // 这句话不太懂什么意思，那之前的节点呢？会断掉吗？
        res = res.next
    }

    // 现在可能还剩一个链表没遍历完
    res.next = l1 ? l1 : l2
    return head.next
};