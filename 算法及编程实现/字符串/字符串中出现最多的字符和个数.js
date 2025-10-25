// abbcccddddd -> 字符最多的是d，出现了5次

let str = "abcabcabcbbccccc";

let obj = {};
let max = 0, key = 0;

for (let i of str) {
    obj[i] = (obj[i] || 0) + 1
}

for (const [k, v] of Object.entries(obj)) {
    if (v > max) {
        max = v
        key = k
    }
}
console.log(`字符最多的是${key}，出现了${max}次`)


// 也可以将上面的 两个for 合并在一个for循环中...