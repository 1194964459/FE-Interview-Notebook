
// Math.max 方法
// Math.max(value0, value1, /* … ,*/ valueN)

const arr = [1, 2, 3];
// 法1：
const max = arr.reduce((a, b) => Math.max(a, b), -Infinity);
