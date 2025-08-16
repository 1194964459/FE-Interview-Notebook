/**
 * 参考：https://juejin.cn/post/6844903855243657230?searchId=20250813194704743EADCDE446AA2F911E
 */

console.log("我是中国人".replace(/我是(?=中国)/, "rr")) // 输出： 'rr中国人'，匹配的是中国前面的'我是'
console.log("我是中国人".replace(/我是(?!中国)/, "rr")) // 输出：'我是中国人'
console.log("我是中国人".replace(/(?!中国)/, "rr")) // 输出：'rr我是中国人'
console.log("我是中国人".replace(/(?:中国)/, "rr")) // 输出：'我是rr人'，匹配'中国'本身
console.log("我是中国人".replace(/(?<=中国)人/, "rr")) // 输出：'我是中国rr'，匹配的是中国后面的'人'
console.log("我是中国人".replace(/(?<!中国)/, "rr")) // 输出：'rr我是中国人'


console.log("abc123def".replace(/(?=\d)/g, '|'))  // abc|1|2|3def
console.log("abc123def".replace(/(?!\d)/g, '|'))  // |a|b|c123|d|e|f|
console.log("abc123def".replace(/(?<=\d)/g, '|'))  // abc1|2|3|def
console.log("abc123def".replace(/(?<!\d)/g, '|'))   // |a|b|c|123d|e|f|

// 多去掉全局匹配
console.log("abc123def".replace(/(?=\d)/, '|'))  // abc|123def
console.log("abc123def".replace(/(?!\d)/, '|'))  // |abc123def
console.log("abc123def".replace(/(?<=\d)/, '|'))  // abc1|23def
console.log("abc123def".replace(/(?<!\d)/, '|'))   // |abc123def