var lenLongestFibSubseq = function (arr) {
    let m = new Map();
    let n = arr.length;
    let dp = new Array(n).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        // m[arr[i]] = i;
        m.set(arr[i], i);
    }

    // i,j,k 三个数构成斐波那契数列: arr[i] = arr[j] + arr[k]
    let res = 0;
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            let arr_k = arr[i] - arr[j];
            if (m.has(arr_k)) {
                let k = m.get(arr_k)
                if (k < j) {
                    dp[i][j] = Math.max(dp[j][k] + 1, 3)
                    res = Math.max(res, dp[i][j]);
                }
            }
        }
    }
    return res;
}

console.log(lenLongestFibSubseq([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(lenLongestFibSubseq([1, 3, 7, 11, 12, 14, 18]));