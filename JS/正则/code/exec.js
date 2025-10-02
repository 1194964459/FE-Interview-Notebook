const str = "apple, banana, apple";
const res = /(\w+)/.exec(str)
console.log('不含g：', res)

const res2 = /\w+/.exec(str)
console.log('不含g 不是捕获组：', res2)

const reg = /(\w+)/g;
let result;
console.log('含g标志，exec仅仅执行一次', reg.exec(str), '\n\n')
while ((result = reg.exec(str)) !== null) {
    console.log(result)
    // console.log(`完整匹配: ${result[0]}, 捕获组: ${result[1]}, 位置: ${result.index}`);
}
// 输出：
// 完整匹配: apple, 捕获组: apple, 位置: 0
// 完整匹配: banana, 捕获组: banana, 位置: 6
// 完整匹配: apple, 捕获组: apple, 位置: 13