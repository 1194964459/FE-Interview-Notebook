/**
 * 链接： https://leetcode.cn/problems/IY6buf/description/
 * 
 * 给定三个字符串 s1、s2、s3，请判断 s3 能不能由 s1 和 s2 交织（交错） 组成。

两个字符串 s 和 t 交织 的定义与过程如下，其中每个字符串都会被分割成若干 非空 子字符串：

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
交织 是 s1 + t1 + s2 + t2 + s3 + t3 + ... 或者 t1 + s1 + t2 + s2 + t3 + s3 + ...
提示：a + b 意味着字符串 a 和 b 连接。

示例 1：
  输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
  输出：true

示例 2：
  输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
  输出：false

示例 3：
  输入：s1 = "", s2 = "", s3 = ""
  输出：true
 */

/***
 * 思路：
 * 1. dp[i][j]表示s1[0, ..., i]（长度为i+1）和s2[0, ..., j]（长度为j+1）是否能交错组成s3[0, ..., i+j+1](长度为i+j+2)
 * 假设s1的字符串长度为m，s2的字符串长度为n，则dp[m-1][n-1]就是整个问题的解！若为true,则能成功交错；否则不能交错组成！
 * 
 * 分析：
 *   字符串s3的下标为i+j+1的字符，既可能来自s1[i],也可能来自s2[j]，所以我们可以分为两种情况：
 *      情况1：若s3[i+j+1]==s1[i]，只要s1[0, ..., i-1]和s2[0, ..., j]能交织得到s3[i+j]，那么s1[0,...,i]和s2[0，..., j]肯定能交织得到s3[i+j+1], 既：dp[i][j] = dp[i-1][j]
 *      情况2：...
 * 所以，dp[i, j]的值依赖于dp[i-1, j] 和 dp[i, j-1]!
 * 
 *
 * 当下标i=0时，dp[0, j]的值依赖于dp[-1，j]和dp[0，j-1]的值! 
 *    i=0时，字符串s1只有一个下标为0的字符；i=-1时，字符串s1为空；dp[-1,j]：即空字符串和s2[0, ..., j]能否交织成s3，取决于s2[0,...,j]和s3[0，..., j]是否相同，若s2[j]和s3[j]不同，则dp[-1,j]=false；否则dp[-1,j]=dp[-1,j-1]
 * 
 * 当下标j=0时，...
 * 
 * 当下标i和j都为-1时，则s1和s2都是空字符串，s3也是空字符串，所以能交错组成
 * 
 *  
 * 4. dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1])
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  let m = s1.length;
  let n = s2.length;
  if (m + n !== s3.length) return false;

  let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(false));   // TODO: 多了下标为-1的情况，所以是总长度+1

  // 特殊情况处理
  dp[-1][-1] = true;  // TODO:索引从0开始

  for (let i = 0; i < m; i++) {
    dp[i][-1] = s1[i] === s3[i];
  }
  for (let j = 0; j < n; j++) {
    dp[-1][j] = s2[j] === s3[j];
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dp[i][j] = (dp[i - 1][j] && s3[i + j + 1] === s1[i]) || (dp[i][j - 1] && s2[j] === s3[i + j + 1]);
    }
  }
  return dp[m - 1][n - 1];
};

console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));  // true
console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc"));  // false
console.log(isInterleave("", "", ""));  // true