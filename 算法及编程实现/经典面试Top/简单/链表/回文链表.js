/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var isPalindrome = function(head) {
    // 此处，head到底是头结点？还是第一个节点？head 是个引用，指向第一个节点

    // 法1：转为数组后再判断是否是回文串   空间是O(n)
    // let arr = []
    // while (head) {
    //     arr.push(head.val);
    //     head = head.next;
    // }
    // let len = arr.length -1 
    // for(let i = 0; i < arr.length/2; i++){
    //     if(arr[i] != arr[len - i]){
    //         return false
    //     }
    // }
    // return true;


    // 法2: 1/2处右侧链表翻转，再判断左右两个链表是否相等，相等的话，是回文串；空间复杂度为O(1)
    let len_head = 0, cur = second = head
    while(cur){
        len_head++
        cur = cur.next
    }

    let i = 0
    // second 为 1/2处右侧的第一个节点 
    while(i < len_head / 2 - 1){
        i++
        second = second.next
    }
    cur = second
    second = second.next
    cur.next = null

    let prev = null
    let cur1 = second
    while(cur1){
        let temp = cur1.next
        cur1.next = prev
        prev = cur1
        cur1 = temp
    }

    while (head && prev){
        if (head.val == prev.val){
            head = head.next
            prev = prev.next
        }
        else{
            return false
        }
    }
    return true;
};