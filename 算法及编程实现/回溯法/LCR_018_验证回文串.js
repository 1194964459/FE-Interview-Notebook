/**
 * 给定一个字符串 s ，验证 s 是否是 回文串 ，只考虑字母和数字字符，可以忽略字母的大小写。

本题中，将空字符串定义为有效的 回文串 。

示例 1：
  输入: s = "A man, a plan, a canal: Panama"
  输出: true
  解释："amanaplanacanalpanama" 是回文串

示例 2：
  输入: s = "race a car"
  输出: false
  解释："raceacar" 不是回文串
 */

/**
* @param {string} s
* @return {boolean}
*/
var isPalindrome = function (s) {
  s = s.toLowerCase();
  // 过滤掉除数字、字符外的字符
  let str = ss.replace(/[^0-9a-zA-Z]/g, ''); // 正则[]表示是一个字符集合，^表示取反
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

// console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
// console.log(isPalindrome("race a car")); // false
// console.log(isPalindrome(" ")); // true
// console.log(isPalindrome("0P")); // false