/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // 先爬到n-1层，或者n-2层
  if (n <= 2) {
    // console.log(n);

    return n;
  }

  let res = climbStairs(n - 1) + climbStairs(n - 2)
  // console.log(res);
  return res
};

/**
 * @param {number} n
 * @return {number}
 */
// var climbStairs = function (n) {
//   if (n == 1 || n == 2) {
//     return n
//   }

//   var a = 1
//   var b = 2
//   var c
//   for (let i = 3; i < n + 1; i++) {
//     c = a + b
//     a = b
//     b = c
//   }

//   return c
// };

// climbStairs(2);
// climbStairs(3);
console.log(climbStairs(4));
console.log(climbStairs(5));