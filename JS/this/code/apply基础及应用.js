/**
 * 应用1：求数组的最大值
 */
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers); // 7

/**
 * 一般而言，fn.apply(null, args) 等同于使用参数展开语法的 fn(...args)，
 *     只是在前者的情况下，args 期望是类数组对象，
 *     而在后者的情况下，args 期望是可迭代对象。
 */


/**
 * 应用2：将数组各项 添加到另一个数组
 *
 * Array.push,  Array.concat 两者异同：
 *    push() 方法将指定的“元素”添加到数组的末尾：
 *         push(element0, element1, … , elementN)
 *    concat() 方法用于合并两个或多个“数组”。返回一个新数组！
 *         concat(arr0, arr1, … , arrN)
 */

// 
/**
 * 合并2个数组：基于 push、concat 两种分别实现：
 */
const letters = ["a", "b", "c"];
const nums = [1, 2, 3];

// 合并第二个数组到第一个数组中
letters.push(...nums);

const newNums = letters.concat(numbers);

console.log(vegetables); // ['parsnip', 'potato', 'celery', 'beetroot']

