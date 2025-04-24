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
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
  /**
   * 假设字符串为S，下标为i的字符为S[i]​，下标从j到i的子字符串为S[j..i]​。
   * 
   * 用f（i）表示从下标为0到i的子字符串S[0..i]的符合条件的最少分割次数。 如果字符串的长度是n，那么f（n-1）就是问题的解。
   * 
   * 1. 如果子字符串S[0..i]本身就是一个回文，那么不需要分割就符合要求，此时f（i）等于0
   * 2. 如果子字符串S[0..i]不是回文，那么我们可以从下标为j(1≤j≤i)的字符开始分割，逐一判断子字符串S[j...i]是不是回文:
   *    => 若是回文，那么f（i）=f（j-1）+1
   */

  let n = s.length;

  let dp = new Array(n).fill(0); // 存放f(i)的结果，最小分割次数

  let isHuiwen = new Array(n).fill(0).map(() => new Array(n).fill(false));

  // console.log(isHuiwen);
  for (let i = 0; i < n; i++) {
    dp[i] = i; // 最坏情况下，分割次数为i

    for (let j = 0; j <= i; j++) {
      if (s[i] === s[j] && (i - j <= 2 || isHuiwen[j + 1][i - 1])) {
        // 为什么会这样判断？
        // 1. 如果s[i] === s[j]，那么j到i之间的字符是对称的
        // 2. 如果i - j <= 2，说明j到i之间的字符只有一个或者两个字符，那么一定是回文串
        // 3. 如果i - j > 2，那么j+1到i-1之间的字符也要是回文串
        // 4. 如果j+1到i-1之间的字符是回文串，那么j到i之间的字符也是回文串
        // 5. 所以我们可以用isHuiwen[j + 1][i - 1]来判断
        // 6. 如果j+1到i-1之间的字符不是回文串，那么j到i之间的字符也不是回文串
        // 7. 所以我们可以用isHuiwen[j + 1][i - 1]来判断

        isHuiwen[j][i] = true;
        dp[i] = j === 0 ? 0 : Math.min(dp[i], dp[j - 1] + 1);
      }
    }
  }
  return dp[n - 1];
};

console.log(minCut("aab")); // 1
console.log(minCut("a")); // 0
console.log(minCut("ab")); // 1