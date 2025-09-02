// copyright-loader.js
module.exports = function (source) {
    // 调用this.async()进入异步模式，获取回调函数
    const callback = this.async();

    // 获取Loader配置选项，默认为空对象
    const options = this.getOptions() || {};
    const author = options.author || 'Unknown Author';

    // 模拟异步操作：比如从远程获取版权信息
    setTimeout(() => {
        try {
            // 获取当前日期
            const date = new Date().toLocaleDateString();

            // 生成要添加的版权注释
            const copyrightComment = `/*
 * 版权所有 © ${date}
 * 作者: ${author}
 * 该文件经过自定义Loader处理
 */\n\n`;

            // 将注释添加到源代码前面
            const result = copyrightComment + source;

            // 异步处理完成，调用回调返回结果
            callback(null, result);
        } catch (error) {
            // 如果出错，将错误传递给Webpack
            callback(error);
        }
    }, 1000); // 模拟1秒的异步操作
};
