const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                // 匹配所有.js文件
                test: /\.js$/,
                // 排除node_modules目录
                exclude: /node_modules/,
                // 使用我们的自定义loader
                use: [
                    {
                        loader: path.resolve(__dirname, 'copyright-loader.js'),
                        options: {
                            author: 'Your Name' // 传递给Loader的配置参数
                        }
                    }
                ]
            }
        ]
    }
};
