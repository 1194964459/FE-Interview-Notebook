# 基于 Webpack 做优化
## 如何提高webpack的打包速度
**happypack**: 利用进程并行编译loader，利用缓存来使得 rebuild 更快，遗憾的是作者表示已经不会继续开发此项目，类似的替代者是thread-loader​

**外部扩展(externals)**: 将不怎么需要更新的第三方库脱离webpack打包，不被打入bundle中，从而减少打包时间，比如jQuery用script标签引入​

**dll**: 采用webpack的 DllPlugin 和 DllReferencePlugin 引入dll，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间​

**利用缓存**: webpack.cache、babel-loader.cacheDirectory、HappyPack.cache都可以利用缓存提高rebuild效率​

**缩小文件搜索范围**: 比如babel-loader插件，如果你的文件仅存在于src中，那么可以include: path.resolve(__dirname， 'src')，当然绝大多数情况下这种操作的提升有限，除非不小心build了node_modules文件


## 如何用webpack来优化前端性能
用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。​

* **压缩代码**:删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的UglifyJsPlugin和ParallelUglifyPlugin来压缩JS文件， 利用cssnano（css-loader?minimize）来压缩css​

**利用CDN加速**: 在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源路径​

**Tree Shaking**: 将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数--optimize-minimize来实现​

**Code Splitting**: 将代码按路由维度或者组件分块(chunk)，这样做到按需加载，同时可以充分利用浏览器缓存​

**提取公共第三方库**: SplitChunksPlugin插件来进行公共模块抽取，利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码​
​
## 如何提高webpack的构建速度？​
​以下是一些常用的方法：​
1.
升级Webpack版本：确保使用的是最新版本的Webpack，因为每个新版本都可能包含一些性能优化。​
2.
使用 DllPlugin：使用 DllPlugin 和 DllReferencePlugin 来将第三方库的代码预先打包，以减少构建时间。这样就可以将这些库的代码从主要的构建中分离出来，并在它们没有发生变化时不需要重新构建。​
3.
使用缓存：启用Webpack的缓存，以便在后续构建中重复使用之前的结果。你可以通过在配置文件中添加 cache: true 来启用缓存。​

```js
module.exports = {​
  // ...​
  cache: true,​
};​
```


4.
多进程/多实例构建：使用工具如 thread-loader 或 happypack 将构建任务分发到多个子进程中，以利用多核处理器的优势。​
5.
只加载必要的资源：确保只加载项目实际需要的资源。使用Webpack的 Tree Shaking 功能来消除未使用的代码。​
6.
减小文件搜索范围：在Webpack配置中指定 resolve 的 modules 和 extensions，以减小Webpack在文件系统中搜索文件的范围。
```js
resolve: {​
  modules: ['node_modules'],​
  extensions: ['.js', '.jsx', '.json'],​
}
```
7.
使用高效的loader：选择性能较好的loader，避免使用过于耗时的loader。如果可能，考虑使用 babel-loader 的 cacheDirectory 选项来缓存Babel的编译结果。​
```js
{​
  loader: 'babel-loader',​
  options: {​
    cacheDirectory: true,​
  },​
}​
```


​
8.
优化图片：使用像 image-webpack-loader 这样的loader来优化图像文件，以减小文件大小。​
9.
Webpack性能分析：使用 Webpack Bundle Analyzer 等工具来分析你的构建输出，找出体积较大的模块，以便进一步优化。​
10.
使用更轻量的插件：可以考虑使用一些轻量级的Webpack插件，避免引入过多的不必要的功能。​
11.
合理使用source map：在开发环境中使用较轻量的source map，例如cheap-module-eval-source-map，在生产环境中禁用或使用更轻量的source map。​
12.
Webpack Parallel Build：使用工具如 webpack-parallel-uglify-plugin 来并行地压缩和优化代码。​
​