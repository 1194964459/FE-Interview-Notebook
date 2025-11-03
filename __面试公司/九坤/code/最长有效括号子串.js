// let str = ")()(()()((((((())("  // 4
let str = "(()" // 2

let stack = [-1]
let maxLen = 0
for (let i = 0; i < str.length; i++) {
    if (str[i] == '(') {
        stack.push(i)
    } else if (str[i] == ')') {
        stack.pop(i)
        if (stack.length == 0) {
            stack.push(i)
        } else {
            maxLen = Math.max(maxLen, i - stack[stack.length - 1])
        }
    }
}
console.log(maxLen)