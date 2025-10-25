// 详细的解析参考B站视频：https://www.bilibili.com/video/BV1nB4y1i7eL/?spm_id_from=333.337.search-card.all.click&vd_source=4544407e622d957f8e7c000a2563b90f

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    let prev = null
    let cur = head
    while (cur) {
        // 暂存
        let temp = cur.next
        cur.next = prev
        // TODO:这里的先后顺序不要搞错了
        prev = cur
        cur = temp
    }
    return prev
};