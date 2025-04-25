/**
 * 给定一个字符串 s，请将 s 分割成一些子串，使每个子串都是回文串。

返回符合要求的 最少分割次数 。

示例 1：
  输入：s = "aab"
  输出：1
  解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。

示例 2：
  输入：s = "a"
  输出：0

示例 3：
  输入：s = "ab"
  输出：1~~`
 */

/**
 * 提示：
1 <= s.length <= 2000
s 仅由小写英文字母组成
 */

/**
 * TODO:思路：
 * 假设字符串为S，下标为i的字符为S[i]​，下标从j到i的子字符串为S[j..i]​。
 * 
 * 用f（i）表示从下标为0到i的子字符串S[0..i]的符合条件的最少分割次数。 如果字符串的长度是n，那么f（n-1）就是问题的解。
 * 
 * 1. 如果子字符串S[0..i]本身就是一个回文，那么不需要分割就符合要求，此时f（i）等于0
 * 2. 如果子字符串S[0..i]不是回文，那么我们可以从下标为j(1≤j≤i)的字符开始分割，逐一判断子字符串S[j...i]是不是回文:
 *    => 若是回文，那么f（i）=f（j-1）+1
 */

/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
  let n = s.length;

  // 存放f(i)的结果，最小分割次数
  let dp = new Array(n).fill(0);

  // isHuiwen[j][i]表示S[j..i]是否是回文串, j是行，i是列，上三角矩阵
  let isHuiwen = new Array(n).fill(0).map(() => new Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    dp[i] = i;   // 最坏情况下，分割次数为i

    for (let j = 0; j <= i; j++) {

      // 判断子字符串S[j..i]是否为回文的标准是：字符S[j]和S[i]相同，并且子字符串S[j+1..i-1]也是回文
      if (s[i] === s[j] && (i - j <= 2 || isHuiwen[j + 1][i - 1])) {

        isHuiwen[j][i] = true;

        // j = 0表示S[0..i]是回文串；此时不需要分割，分割次数为0
        if (j === 0) {
          dp[i] = 0;
        } else {
          dp[i] = Math.min(dp[i], dp[j - 1] + 1);
        }
      }
    }
  }
  // console.log(isHuiwen);
  return dp[n - 1];
};

/**
 * 时间复杂度 O(n^3): n为1000时，超出时间限制
 */
var minCut2 = function (s) {
  let n = s.length;

  // 存放f(i)的结果，最小分割次数
  let dp = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    dp[i] = i
    for (let j = 0; j <= i; j++) {
      if (isPalindrome(s.slice(j, i + 1))) {
        if (j === 0) {
          dp[i] = 0;
        } else {
          dp[i] = Math.min(dp[i], dp[j - 1] + 1)
        }
      }
    }
  }
  return dp[n - 1];
}


// 是否是回文串
var isPalindrome = function (s) {
  // 过滤掉除数字、字符外的字符
  let str = s.toLowerCase().replace(/[^0-9a-zA-Z]/g, ''); // 正则[]表示是一个字符集合，^表示取反
  // console.log('str: ', str);
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

console.log(minCut("aab")); // 1
console.log(minCut("a")); // 0
console.log(minCut("ab")); // 1
console.log(minCut("abbab")); // 1

console.log('-----------------')

console.log(minCut2("aab")); // 1
console.log(minCut2("a")); // 0
console.log(minCut2("ab")); // 1
console.log(minCut2("abbab")); // 1