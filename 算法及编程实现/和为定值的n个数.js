// 题目描述：输入两个整数n和sum，从数列1，2，3.......n 中随意取几个数，使其和等于sum，要求将其中所有的可能组合列出来。

/**
 * 考虑是否取第n个数的策略，可以转化为一个只和前n-1个数相关的问题 
 * 取第n个：sumOfkNumber(sum-n，n-1)
 * 不取...：sumOfkNumber(sum, n-1)
 * 
 * @param {*} n 
 * @param {*} sum
 * 
 */
function SumOfkNumber(n, sum) {
    if (n <= 0 || sum <= 0) {
        return false;
    }



}

SumOfkNumber()