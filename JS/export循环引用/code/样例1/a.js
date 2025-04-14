// 参考：https://www.jianshu.com/p/3f1f54c2c62a

// a.js
console.log("before import b")
import { b } from "./b.js"
console.log("b is " + b)
export let a = b + 1;


// 假定先加载a.js

/**
 * 结果是：
before import a
a is undefined
before import b
b is NAN
* /

// 这里有一个有趣的现象就是第一句输出并不是before import b，也就是虽然import语句在后面，但确会更早执行，当执行import b时，加载并运行b.js，从而第一句输出是before import a。

// 作者：一只好奇的茂
// 链接：https://www.jianshu.com/p/3f1f54c2c62a
// 来源：简书


import，export会提前