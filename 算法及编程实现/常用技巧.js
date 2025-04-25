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


