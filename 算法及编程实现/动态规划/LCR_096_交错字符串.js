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

  let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(false));   // TODO:
  dp[0][0] = true;
  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }
  return dp[m][n];
};

console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));  // true
console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc"));  // false
console.log(isInterleave("", "", ""));  // true