/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
	
	https://leetcode.cn/problems/valid-parentheses/

 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
	let arr = []
	for (let it of s) {
		if (it == '(' || it == '[' || it == '{') {
			arr.push(it)
		}
		else if (it == ')' || it == ']' || it == '}') {
			let cur = arr.pop()
			if (
				cur == '(' && it == ')'
				|| cur == '[' && it == ']'
				|| cur == '{' && it == '}'
			) {
				continue;
			} else {

				return false
			}
		}
	}

	return arr.length === 0
};