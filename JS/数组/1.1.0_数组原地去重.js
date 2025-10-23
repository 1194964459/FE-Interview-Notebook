/**
 * 双指针法：
 * 
 我们从数组的第二个元素（即下标为1的元素）开始遍历，将其与慢指针指向的元素进行比较。如果它们不相等，说明遇到了一个新的不重复元素，将慢指针后移一位，并将新的元素放入该位置。如果它们相等，则跳过该元素，继续向后遍历。​
 */

function removeDuplicates(nums) {
    if (nums.length === 0) return 0; // 空数组直接返回0

    let slow = 0; // 慢指针，指向去重后最后一个元素
    for (let fast = 1; fast < nums.length; fast++) {
        // 当快指针元素与慢指针元素不同时，更新慢指针并赋值
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }

    return slow + 1; // 长度为索引+1
}

// 测试用例1
// const nums1 = [1, 1, 2];
// const len1 = removeDuplicates(nums1);
// console.log(len1); // 输出：2（去重后长度）
// console.log(nums1.slice(0, len1)); // 输出：[1, 2]

// 测试用例2
const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const len2 = removeDuplicates(nums2);
console.log(len2); // 输出：5
console.log(nums2.slice(0, len2)); // 输出：[0, 1, 2, 3, 4]