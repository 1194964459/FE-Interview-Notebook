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
 var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null

    let lenA = 1, lenB = 1, curA = headA, curB = headB
    while(curA.next){
        lenA++
        curA = curA.next 
    }
    while(curB.next){
        lenB++
        curB = curB.next 
    }

    if (curA != curB) return null

    // 重新指向头结点
    curA = headA, curB = headB

    // 先舍弃多出的几位
    let cha = lenA - lenB
    if(cha > 0){
        while(cha > 0){
            curA = curA.next 
            cha--
        }
    }else{
        while(cha < 0){
            curB = curB.next
            cha++
        }
    }

    // 现在两个链表具有同样的长度
    while(curA){
        if(curA == curB){
            return curA
        }else{
            curA = curA.next
            curB = curB.next
        }
    }
};