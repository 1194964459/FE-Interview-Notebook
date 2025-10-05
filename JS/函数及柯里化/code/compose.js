function compose(...fns) {
    // 如果没有传入函数，返回一个返回自身的函数
    if (fns.length === 0) {
        return (arg) => arg;
    }

    // 如果只有一个函数，直接返回该函数
    if (fns.length === 1) {
        return fns[0];
    }

    // 组合多个函数，从右到左执行
    return fns.reduce(
        (pre, cur) => (...args) => pre(cur(...args))
    );
}

function toUpper(str) {
    let res = str.toUpperCase();
    console.log(res)
    return res;
}

function reverse(str) {
    let res = str.split('').reverse().join('');
    console.log(res)
    return res;
}

function addPrefix(str) {
    let res = `Prefix: ${str}`;
    console.log(res)
    return res;
}

// 组合函数：先反转，再转大写，最后添加前缀
const processStr = compose(addPrefix, toUpper, reverse);

processStr('hello');

// olleh
// OLLEH
// Prefix: OLLEH

// 执行顺序：reverse("hello") → toUpper("olleh") → addPrefix("OLLEH")

