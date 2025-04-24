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

   "a", "a", "aa", 
 */

/**
* @param {string} s
* @return {number}
*/
var countSubstrings = function (s) {
  let res = [];

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let str = s.substring(i, j + 1);
      if (isHuiwen(str)) {
        res.push(str);
      }
    }
  }

  return res;
};

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

console.log(countSubstrings("abc"));
console.log(countSubstrings("aaa"));