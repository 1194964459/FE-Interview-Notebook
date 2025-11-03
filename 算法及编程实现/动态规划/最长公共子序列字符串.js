// https://www.nowcoder.com/practice/6d29638c85bb4ffd80c020fe244baf11?tpId=295&tqId=991075&sourceUrl=%2Fexam%2Foj%3FquestionJobId%3D10%26subTabName%3Donline_coding_page

/**
给定两个字符串 s1 和 s2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列，返回 0。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。

示例1：
    输入：s1 = "abcde", s2 = "ace" 
    输出：3  
    解释：最长公共子序列是 "ace" ，它的长度为 3 。
 */

function LCS(s1, s2) {
    let m = s1.length
    let n = s2.length

    let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
    // console.log(dp)

    for (let i = 1; i <= m; i++) {
        dp[i][0] = 0
    }

    for (let j = 1; j <= n; j++) {
        dp[0][j] = 0
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    // console.log(dp[m][n])

    let res = []
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (s1[i - 1] == s2[j - 1]) {
            res.unshift(s1[i - 1])
            i--
            j--
        } else {
            if (dp[i - 1][j] > dp[i][j - 1]) {
                i--
            } else {
                j--
            }
        }
    }
    return res.length == 0 ? '-1' : res.join('')
    // return dp[m][n]
}

console.log(LCS("1A2C3D4B56", "B1D23A456A"))
console.log(LCS("abc", "def"))
console.log(LCS("abc", "abc"))

console.log(LCS("ab", ""))

// console.log(LCS('abcde', 'ace'))
// console.log(LCS('abc', 'abc'))
// console.log(LCS('abc', 'def'))


