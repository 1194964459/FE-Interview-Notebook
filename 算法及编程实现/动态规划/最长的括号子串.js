// BM77 最长的括号子串
// https://www.nowcoder.com/practice/45fd68024a4c4e97a8d6c45fc61dc6ad?tpId=295&tqId=715&sourceUrl=%2Fexam%2Foj

let str = ")()(()()((((((())("  // 4
// "(()" // 2

function longestValidParentheses(s) {
    let maxLen = 0;
    const stack = [-1]; // 栈底存储无效括号的索引，初始为-1
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i); // 左括号索引入栈
        } else {
            stack.pop(); // 尝试匹配左括号
            if (stack.length === 0) {
                stack.push(i); // 无匹配左括号，更新无效起始点
            } else {
                // 计算当前有效子串长度
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);   // 当前有效子串长度 = 当前索引 - 栈顶索引，
            }
        }
    }
    return maxLen;
}

console.log(longestValidParentheses(str))