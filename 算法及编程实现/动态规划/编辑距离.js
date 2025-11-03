// https://www.nowcoder.com/practice/6a1483b5be1547b1acd7940f867be0da?tpId=295&tqId=2294660&sourceUrl=%2Fexam%2Foj%3FquestionJobId%3D10%26subTabName%3Donline_coding_page


// 给定两个字符串 str1 和 str2 ，请你算出将 str1 转为 str2 的最少操作数。
// 你可以对字符串进行3种操作：
// 1.插入一个字符
// 2.删除一个字符
// 3.修改一个字符。

/**
设 dp[i][j] 表示：将 str1[0..i-1]（前 i 个字符）转换成 str2[0..j-1]（前 j 个字符）所需的最少编辑步数。
假设m == str1.length; n = str2.length，i的取值范围是0~m，i=0的时候 表明str1是空串，所以dp数组应该是dp[m][n]

边界处理：
    str1为空，转换成str2时需要新增str2.length个长度
    str2为空，转换成str2时需要删除str1.length个长度

若str1[i-1] === str2[j-1]，dp[i,j]=dp[i-1,j-1]
若str1[i-1] !== str2[j-1]，插入、删、改三项操作分别试一下，然后取最小值

所以最后应该返回的值是dp[m][n]
*/


/**
 * @param str1 string字符串 
 * @param str2 string字符串 
 * @return int整型
 */
function editDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // const dp = new Array(m + 1).fill(0).map((i) => new Array(n + 1).fill(0))
    const dp = Array.from({ length: m + 1 }, (_, i) => new Array(n + 1).fill(0))

    for (let i = 1; i <= m; i++) {   // 注意这里是<=m，不是<m
        dp[i][0] = i
    }
    for (let j = 1; j <= n; j++) {
        dp[0][j] = j
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] == str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(
                    dp[i][j - 1] + 1,  // TODO:插入
                    dp[i - 1][j] + 1,  // 删除
                    dp[i - 1][j - 1] + 1  // 修改
                )
            }
        }
    }

    console.log(dp[m][n])
    return dp[m][n];
}

editDistance("now", "nowcoder")
