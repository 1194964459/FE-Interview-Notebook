/**
 * 给定一个字符串 s ，请计算这个字符串中有多少个回文子字符串。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

示例 1：
  输入：s = "abc"
  输出：3
  解释：三个回文子串: "a", "b", "c"

示例 2：
  输入：s = "aaa"
  输出：6
  解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 */

/**
* @param {string} s
* @return {number}
*/
var countSubstrings = function (s) {
  let res = [];
  helper(s, 0, [], res);
  return res;
};

function helper(s, start, zuhe, res) {
  if (start === s.length) {
    return;
  }
  for (let i = start; i < s.length; i++) {
    let str = s.substring(start, i + 1);
    console.log(str);
    if (isHuiwen(str)) {
      // zuhe.push(str);
      res.push(str)
      helper(s, i + 1, zuhe, res);
      // res.pop();
    }
  }
}
// 是否是回文串？
function isHuiwen(str) {
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
}

// console.log(countSubstrings("abc"));
console.log(countSubstrings("aaa"));