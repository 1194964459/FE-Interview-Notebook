/**
 * 千位字符分割
 */
function formatNumber(num) {
    // 将数字转为字符串，处理整数和小数情况
    const str = num.toString();
    // 分离整数部分和小数部分
    const parts = str.split('.');
    let integerPart = parts[0];

    // 核心正则：给整数部分添加千位分隔符
    // integerPart = integerPart.replace(/(?=(\d{3})+$)/g, ',')
    integerPart = integerPart.replace(/\B(?=(\d{3})+$)/g, ',')  // 比上面的多了 \B，是为了过滤掉最前面的 ,

    // 拼接小数部分（如果有）
    return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
}

// 测试示例
console.log(formatNumber(123));         // "123"（不足3位，无逗号）
console.log(formatNumber(1234));        // "1,234"
console.log(formatNumber(1234567));     // "1,234,567"
console.log(formatNumber(123456789.12));// "123,456,789.12"
console.log(formatNumber(0));           // "0"

