function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error('除数不能为0'); // 主动抛出异常
        }
        return a / b;
    } catch (error) {
        console.log('捕获到错误：', error.message); // 处理错误
        return '计算失败'; // 错误时的返回值
    } finally {
        console.log('计算完成（无论是否出错）'); // 一定会执行
    }
}

console.log(divide(10, 2));
// 输出：5 → 计算完成（无论是否出错）
// console.log(divide(10, 0));
// 输出：捕获到错误：除数不能为0 → 计算完成（无论是否出错） → 计算失败