/**
 * 给定一个字符串 s ，请将 s 分割成一些子串，使每个子串都是 回文串 ，返回 s 所有可能的分割方案。 
 
回文串 是正着读和反着读都一样的字符串。

示例 1：
  输入：s = "google"
  输出：[["g","o","o","g","l","e"],["g","oo","g","l","e"],["goog","l","e"]]

示例 2：
  输入：s = "aab"
  输出：[["a","a","b"],["aa","b"]]

示例 3：
  输入：s = "a"
  输出：[["a"]]
 */

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  let res = [];
  helper(s, 0, [], res);
  console.log(res);
  return res;
};

/**
 * @param {*} start：表示从第几个字符开始切割
 * 
 * 注意：'g'开头的子字符串，分别为"g"、"go"、"goo"、"goog"、"googl"和"google"
 */
function helper(s, start, zuhe, res) {
  if (start === s.length) {
    res.push(zuhe.slice());
    return;
  }
  for (let i = start; i < s.length; i++) {
    let str = s.substring(start, i + 1);
    // console.log(str);
    if (isHuiwen(str)) {
      console.log('回文：', str);

      zuhe.push(str);
      helper(s, i + 1, zuhe, res);
      zuhe.pop();
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

partition("google");
// partition("aab");
// partition('abc')

/**
a
b
c
bc
ab
abc
 */

/**
 * 
g
o
o
g
l
e

le

gl
gle

og
ogl
ogle

oo
g // 若是回文，需进到对应的判断中..
l
e
le
gl
gle  //
oog
oogl
oogle

go
goo
goog
l
e
le
googl
google
 */