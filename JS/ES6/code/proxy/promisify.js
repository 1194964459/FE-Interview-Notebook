function promisify(func, options = {}) {
    const {
        successKey = 'success',  // 成功回调的键名
        failKey = 'fail',        // 失败回调的键名
        multiArgs = false        // 是否返回多个参数
    } = options;

    return function (...args) { // TODO:此处的返回函数一定是“普通函数”，这样才能正确处理 this 上下文
        return new Promise((resolve, reject) => {
            // 创建包含成功/失败回调的对象
            const callbacks = {
                [successKey]: (...results) => {
                    resolve(multiArgs ? results : results[0]);
                },
                [failKey]: (err) => {
                    reject(err);
                }
            };

            // 调用原始 API，传入参数和回调对象
            func.call(this, ...args, callbacks);  // TODO:将调用时的this上下文传递给原始函数
        });
    };
}

/**
 * 注意：JS中this是由函数的调用者决定的。
 *    当 promisify(func) 返回的函数被调用时，this 会被传递给原始函数 func。
 */
const promisified = promisify(someApi);
promisified(arg1, arg2); // this 为全局对象（非严格模式）或 undefined（严格模式）

/**
 * this:
 *     箭头函数的this：继承自外层作用域（定义时的上下文）。
 *     普通函数的this：由调用者决定
 */


/**
 * TODO:假设使用箭头函数定义返回函数：
 *  promisify的this值没有意义，最主要的是func期望被调用位置的执行上下文
 */
// 错误示例：箭头函数会固定 this 值
function promisify(func) {
    return (...args) => { // 箭头函数，this 继承自promisify函数，导致不是func预期的执行上下文
        func.call(this, ...args, callback); // this 可能不是预期值
    };
}