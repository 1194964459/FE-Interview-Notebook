/**
 * 
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

示例 1：
  输入：text1 = "abcde", text2 = "ace" 
  输出：3  
  解释：最长公共子序列是 "ace" ，它的长度为 3。

示例 2：
  输入：text1 = "abc", text2 = "abc"
  输出：3
  解释：最长公共子序列是 "abc" ，它的长度为 3。

示例 3：
  输入：text1 = "abc", text2 = "def"
  输出：0
  解释：两个字符串没有公共子序列，返回 0。

提示：
  1 <= text1.length, text2.length <= 1000
  text1 和 text2 仅由小写英文字符组成。
 */

/**
 * 思路：
 * f(i, j)表示第1个字符串中下标 从0到i 的字符串（记为：s1[0, ..., i]） 和 第2个字符串中下标 从0到j 的字符串（记为：s2[0, ..., j]）的最长公共子序列的长度！
 * 若第1个字符串的最大长度是m，第2个字符串最大长度为n，则f(m-1, n-1)就是我们要求的最长公共子序列的长度！
 *
 * 若s1[i] === s2[j]，则f(i, j) = f(i-1, j-1) + 1
 * 否则，f(i, j) = max(f(i-1, j), f(i, j-1))
 * 
 * TODO:若i,j为0时，会取到f(-1,-1)、f(0, -1)或f(-1,0)的值，所以dp长度为len1+1（取到下标为-1，比字符串本身长度多1）
 * 
 * TODO:用dp[i+1][j+1]来表示f(i, j)，即dp[i+1][j+1] = f(i, j)
 */
/**
* @param {string} text1
* @param {string} text2
* @return {number}
*/
var longestCommonSubsequence = function (text1, text2) {
  let len1 = text1.length;
  let len2 = text2.length;
  let dp = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));  // TODO:为什么是len1 + 1? 答案如上
  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      if (text1[i] === text2[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }
  // console.log(dp);
  return dp[len1][len2];
};

console.log(longestCommonSubsequence("abcde", "ace")); // 3
console.log(longestCommonSubsequence("abc", "abc")); // 3
console.log(longestCommonSubsequence("abc", "def")); // 0


