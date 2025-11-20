/**
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 */

function resolve(arr) {
    let len = arr.length
    let dp = new Array(len).fill(0)
    dp[0] = 1

    for (let i = 1; i < arr.length; i++) {
        let max = 0

        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                if (max < dp[j]) {
                    max = dp[j]
                }
            }
        }
        dp[i] = max + 1
    }
    return Math.max(...dp)
}
