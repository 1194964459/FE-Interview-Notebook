/**
 * 请使用最基本的遍历来实现判断字符串 a 是否被包含在字符串 b 中，并返回第一次出现的位置（找不到返回 -1）。
 */

a = '34'; b = '1234567'; // 返回 2
console.log(isContain(a, b), func(a, b))


a = '35'; b = '1234567'; // 返回 -1
console.log(isContain(a, b), func(a, b))

a = '355'; b = '12354355'; // 返回 5
console.log(isContain(a, b), func(a, b))


if (a.length < b.length) {
    short = a;
    long = b;
} else {
    short = b;
    long = a;
}

function isContain(short, long) {
    const len = short.length;
    let i = 0;
    for (; i < long.length; i++) {
        if (long.slice(i, i + len) === short) {
            return i
        }
    }
    // if (i === long.length) {
    return -1
    // }
}

function func(a, b) {
    // if (a.length >= b.length) {
    //     return a.indexOf(b)
    // }

    return a.length >= b.length ? a.indexOf(b) : b.indexOf(a)
}
