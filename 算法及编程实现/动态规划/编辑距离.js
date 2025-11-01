// https://www.nowcoder.com/practice/6a1483b5be1547b1acd7940f867be0da?tpId=295&tqId=2294660&sourceUrl=%2Fexam%2Foj%3FquestionJobId%3D10%26subTabName%3Donline_coding_page


// 给定两个字符串 str1 和 str2 ，请你算出将 str1 转为 str2 的最少操作数。
// 你可以对字符串进行3种操作：
// 1.插入一个字符
// 2.删除一个字符
// 3.修改一个字符。

/**
设 dp[i][j] 表示：将 str1[0..i-1]（前 i 个字符）转换成 str2[0..j-1]（前 j 个字符）所需的最少编辑步数。

边界处理：
    str1为空，转换成str2时需要新增str2.length个长度
    str2为空，转换成str2时需要删除str1.length个长度

若str1[i-1] === str2[j-1]，dp[i,j]=dp[i-1,j-1]
若str1[i-1] !== str2[j-1]，插入、删、改三项操作分别试一下，然后取最小值



*/
