/**
 * 括号生成：
 *    正整数 n 代表生成括号的对数，请设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 * 
示例 1：
  输入：n = 3
  输出：["((()))","(()())","(())()","()(())","()()()"]

示例 2：
  输入：n = 1
  输出：["()"]
 */

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let res = [];
  helper(n, 0, 0, [], res);
  console.log(res);
};

function helper(n, left, right, zuhe, res) {
  if (zuhe.length === n * 2) {
    res.push(zuhe.slice().join(''));
    return;
  }

  if (left < n) {
    zuhe.push('(');
    helper(n, left + 1, right, zuhe, res);
    zuhe.pop();
  }

  if (right < left) {
    zuhe.push(')');
    helper(n, left, right + 1, zuhe, res);
    zuhe.pop();
  }
}
generateParenthesis(3); // ["((()))","(()())","(())()","()(())","()()()"]
// generateParenthesis(2); // ["(())","()()"]
// generateParenthesis(1); // ["()"]
// generateParenthesis(0); // []