/**
 * 新建个数组，每项初始化为false
 */
// 法1：将一个iterable对象调用mapFun函数，返回一个新数组
const vis = Array.from({ length: arr.length }, () => false);
// 法2：  
const vis2 = new Array(arr.length).fill(false);


/**
 * 新建个数组，[1, 2, 3, ..., n]
 */
const arr = Array.from({ length: nums.length }, (_, i) => i + 1);

/**
 * 子串与子序列： 子串要求字符连续出现，而子序列则不要求字符连续。
 * 如: 字符串abcd, 子串有ab, bc, cd, abc, abcd等，子序列有a, b, c, d, ac, ad, bc, bd, cd等。
 */
