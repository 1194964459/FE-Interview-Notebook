/**
 * 将传统回调函数的API转换为Promise的API：
 *     1. 原始API异步函数中依据异步的结果分别“调用”回调函数
 *     2. 转换后的promisify函数中“调用”原始API异步函数、并且“定义”其参数即callback回调函数
 */

/**
 * 法1：原始API异步函数，及调用
 */
function fetchData(callback) {
    setTimeout(() => {
        console.log("回调内...");
        const success = Math.random() > 0.5;
        if (success) {
            callback(null, "数据成功返回");  // 回调函数在此“执行”
        } else {
            callback(new Error("请求失败"), null);
        }
    }, 1000);
}

fetchData((error, data) => {
    if (error) {
        console.error("失败:", error.message);
    } else {
        console.log("成功:", data);
    }
});

/**
 * 法2：转为Promise后调用
 */
function promisifyFetchData() {
    return new Promise((resolve, reject) => {
        fetchData((error, data) => {  // 回调函数在此“定义”，哪里调用普通的异步函数  哪里就需要定义对应的回调
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

promisifyFetchData()
    .then(data => {
        console.log("成功:", data);
    })
    .catch(error => {
        console.error("失败:", error.message);
    });