// 要求：没有额外空间，时间复杂度是O(n)

// 原理：异或
// 0 和 任何其他数 异或，都是数本身；
// 两个相同的数异或，则为0；
// 异或是满足分配率的，即与顺序无关，0 异或 A 异或 B，与 B 异或 A 异或 0，得到的结果是一样的

/**
 * @param {number[]} nums
 * @return {number}
 */
for(let i = 1; i < nums.length; i++){
    nums[0] ^= nums[i]
}
return nums[0]