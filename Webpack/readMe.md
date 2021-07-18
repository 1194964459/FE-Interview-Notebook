webpack常见面试题：

https://juejin.cn/post/6844904094281236487


https://blog.csdn.net/duyujian706709149/article/details/97299339


执行 npx webpack，会将我们的脚本 src/index.js 作为 入口起点，也会生成 dist/main.js 作为 输出。Node 8.2/npm 5.2.0 以上版本提供的 npx 命令，可以运行在开始安装的 webpack package 中的 webpack 二进制文件（即 ./node_modules/.bin/webpack）

## loader
“嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先 use(使用) raw-loader 转换一下。”

## plugin


## tree shaking 
必备的几个条件：
* es6模块
* babelrc里设置 module:false，devtool:false，即可在 mode:prouction 中默认开启

## 代码分割
* 入口点分割：若包含重复模块，会被重复引入到各个Bundle中
* 动态导入 import() 和懒加载
* 预加载：未来**肯定会**用到某些资源（js，css，图片等），使用 preload 可以预先加载，资源加载有5个优先级（high，medium，low..）
* prefetch：未来**可能会**用到某个资源，浏览器在空闲的时候加载
* 提取公共代码

module
chunk：入口、import()、splitChunks拆分出去的代码
bundle：打包后的文件
 