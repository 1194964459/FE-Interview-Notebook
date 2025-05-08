/**
 * 如果序列 X_1, X_2, ..., X_n 满足下列条件，就说它是 斐波那契式 的：

n >= 3
对于所有 i + 2 <= n，都有 X_i + X_{i+1} = X_{i+2}
给定一个严格递增的正整数数组形成序列 arr ，找到 arr 中最长的斐波那契式的子序列的长度。如果一个不存在，返回  0 。

（回想一下，子序列是从原序列  arr 中派生出来的，它从 arr 中删掉任意数量的元素（也可以不删），而不改变其余元素的顺序。例如， [3, 5, 8] 是 [3, 4, 5, 6, 7, 8] 的一个子序列）

 
示例 1：
    输入: arr = [1,2,3,4,5,6,7,8]
    输出: 5
    解释: 最长的斐波那契式子序列为 [1,2,3,5,8] 。

示例 2：
    输入: arr = [1,3,7,11,12,14,18]
    输出: 3
    解释: 最长的斐波那契式子序列有 [1,11,12]、[3,11,14] 以及 [7,11,18] 。
 */

/**
 * 思路： 
 *      当处理到数字6时，既可以和1、5、6组成斐波那契数列，也可以和2、4、6组成斐波那契数列。也就是说，每处理到一个数字时可能面临若干选择，需要从这些选择中找出最长的斐波那契数列。
 * 
 * 将数组记为A，A[i]表示数组中下标为i的数字。对于每个j(0≤j<i), A[j]都有可能是在某个斐波那契数列中A[i]的前一个数字。
 * 如果存在一个k(0≤k<j)满足A[k]+A[j]=A[i]，那么这3个数字就组成一个斐波那契数列。
 * 
 * 这个以“A[i]结尾，前一个数字是A[j]的斐波那契数列长度(计为dp[j][i])”应该是“A[j]结尾，前一个数字是A[k]的斐波那契数列长度（计为dp[k][j]）”值再加1
 * 
 * 
 * */
/**
 * @param {number[]} arr
 * @return {number}
 */
var lenLongestFibSubseq = function (arr) {
    const indices = new Map();
    const n = arr.length;

    // 哈希表map来记录每个数字在数组中的下标。有了这个哈希表就可以用O（1）的时间判断数组中是否存在一个数字A[k]满足A[k]=A[i]-A[j] 
    for (let i = 0; i < n; i++) { // hash表，提升效率
        indices.set(arr[i], i);
    }
    const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let ans = 0;
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            let arr_k = arr[i] - arr[j];
            if (indices.has(arr_k)) {
                let k = indices.get(arr_k)
                if (indices.get(arr_k) < j) {
                    dp[j][i] = Math.max(dp[k][j] + 1, 3);   // [k, j，i] 三个数构成斐波那契数列, 所以 max 函数中参与比较的值是3
                    ans = Math.max(ans, dp[j][i]);
                }
            }
        }
    }
    return ans;
};

console.log(lenLongestFibSubseq([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(lenLongestFibSubseq([1, 3, 7, 11, 12, 14, 18]));