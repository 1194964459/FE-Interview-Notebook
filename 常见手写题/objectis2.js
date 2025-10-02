function myObjectIs(a, b) {
    // 处理NaN的情况
    if (a !== a) {
        return b !== b;
    }

    // 处理-0和+0的情况
    if (a === 0 && b === 0) {
        return 1 / a === 1 / b;
    }

    // 其他情况使用严格相等
    return a === b;
}

// 测试用例
console.log(myObjectIs(2, 2)); // true
console.log(myObjectIs(2, "2")); // false
console.log(myObjectIs(NaN, NaN)); // true
console.log(myObjectIs(-0, +0)); // false
console.log(myObjectIs(null, null)); // true
console.log(myObjectIs(undefined, undefined)); // true
console.log(myObjectIs({}, {})); // false (不同对象引用)


