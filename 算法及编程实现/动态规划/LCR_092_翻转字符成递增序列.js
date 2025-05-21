/**
 * 如果一个由 '0' 和 '1' 组成的字符串，是以一些 '0'（可能没有 '0'）后面跟着一些 '1'（也可能没有 '1'）的形式组成的，那么该字符串是 单调递增 的。

我们给出一个由字符 '0' 和 '1' 组成的字符串 s，我们可以将任何 '0' 翻转为 '1' 或者将 '1' 翻转为 '0'。

返回使 s 单调递增 的最小翻转次数。

示例 1：
  输入：s = "00110"
  输出：1
  解释：我们翻转最后一位得到 00111.

示例 2：
  输入：s = "010110"
  输出：2
  解释：我们翻转得到 011111，或者是 000111。

示例 3：
  输入：s = "00011000"
  输出：2
  解释：我们翻转得到 00000000。
 */

/**
* @param {string} s
* @return {number}
*/
var minFlipsMonoIncr = function (s) {
  let start_1 = s.indexOf('1')
  let end_0 = s.lastIndexOf('0')
  if (end_0 < start_1) {
    return 0
  }
  let f = Array(s.length).fill(0) // 前i-1个单调递增,第i个翻转为0
  let g = Array(s.length).fill(0) // 前i-1个单调递增,第i个翻转为1
  f[0] = s[0] === '0' ? 0 : 1
  g[0] = s[0] === '1' ? 0 : 1
  for (let i = 1; i < s.length; i++) {
    if (s[i] === '0') {
      f[i] = f[i - 1]
      g[i] = Math.min(f[i - 1], g[i - 1]) + 1
    } else {
      f[i] = f[i - 1] + 1
      g[i] = Math.min(f[i - 1], g[i - 1])
    }
  }
  return Math.min(f[s.length - 1], g[s.length - 1])
};

console.log(minFlipsMonoIncr("00110"));
// console.log(minFlipsMonoIncr("010110"));
// console.log(minFlipsMonoIncr("00011000"));
console.log(minFlipsMonoIncr("10011111110010111011"));

/**
 * 翻转下标为i的字符依赖于前i个字符翻转之后最后一个字符是'0'还是'1':
 *    f(i): 把字符串从0到i翻转成单调递增的最小翻转次数，且翻转后的最后一个字符(下标i)是'0'
 *    g(i): 把字符串从0到i翻转成单调递增的最小翻转次数，且翻转后的最后一个字符(下标i)是'1'
 *    若字符串长度为n，则最终的解是 Math.min(f(n-1), g(n-1))
 * 
 *  => 若翻转后下标为i的字符是'0'，则下标为i-1的字符只能是'0'，否则就不是单调递增了
 *    1. 若输入字符S[i]是'0'，则f(i) = f(i-1)
 *    2. 若输入字符S[i]是'1'，则f(i) = f(i-1) + 1
 * 
 *  => 若翻转后下标为i的字符是'1'，则下标为i-1的字符只能是'0'或者'1'
 *    1. 若输入字符S[i]是'0'，则g(i) = min[f(i-1),g(i-1)] + 1, TODO:为什么不是g(i)=g(i-1)+1?? (已明白)
 *    2. 若输入字符S[i]是'1'，则g(i) = min[f(i-1), g(i-1)]
 */