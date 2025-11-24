## JS中的浮点数：

JS中的浮点数存储的是准确值吗 
答：JS 中的浮点数不是存储的准确值（除了少数能被二进制精确表示的小数外），核心原因是 JS 采用 IEEE 754 双精度浮点数标准。

JS 的浮点数用 64 位存储，其中 尾数位仅 52 位（加上隐含的整数部分 “1”，共 53 位有效数字）。
对于无限循环的二进制小数，52 位尾数位无法容纳全部位数，只能截断或舍入（类似十进制保留 2 位小数时，1/3 = 0.33），导致存储的是 “近似值” 而非 “准确值”。


## 基础
以下3个都是Number类型：
* Number.MAX_SAFE_INTEGER：管的是整数精度。超出该数值后，整数会丢失精度
* Number.MAX_VALUE：Number 类型的最大有效数值，管的是数值大小。超出后直接溢出为 Infinity
* Infinity
```js
// 从数值大小看
Number.MAX_SAFE_INTEGER < Number.MAX_VALUE < Infinity  
```

* BigInt：
`整数 > Number.MAX_SAFE_INTEGER` → 必须用 BigInt 才能精确表示


Number.EPSILON

## 相关方法
`padStart(length, padStr)`：针对的是字符串，长度没length长的话，用padStr对应的字符补齐。左侧补齐
padEnd：同padStart，不过是右侧补齐
```js
const code = "123";
console.log(code.padEnd(5, "0")); // "12300"
```

## 使用原则
* 数值转换：简单纯数字用 Number()，字符串提取整数用 parseInt(..., radix)，超安全整数用 BigInt(字符串)；
* 精度计算：安全范围内整数用 Number，超范围用 BigInt，浮点数转整数运算，复杂场景用 decimal.js；
* 格式化显示：整数补零用 padStart，小数保留用 toFixed，二者可配合使用；
* 等值判断：浮点数用 Number.EPSILON，整数（含 BigInt）用 ===；
* 避坑核心：超安全整数必用 BigInt，浮点数运算必转整数 / 用库，数值比较必区分 “整数 / 浮点数”。


