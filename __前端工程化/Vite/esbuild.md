# esbuild
exbuild是Go 语言编写
开发阶段、生产阶段均有用；主要是用在开发阶段

主要四大功能：依赖预构建、转译配置、缓存策略、资源处理”

## 依赖“预构建”
① 解决兼容性问题，如将**不同格式**的模块统一转换为 **ESM 格式**；
② 加快首次加载速度：预构建结果**缓存**到```node_modules/.vite 目录```，当浏览器首次请求相关模块时，可直接从缓存中取，仅在**依赖变更时重新构建**。
③ **合并多个依赖模块为单个文件**，减少浏览器请求次数。

可以在optimizeDeps中配置include、exclude中配置，减少预构建的范围和重复执行。

## 转译
exbuild是Go 语言编写，构建/转译速度是 Babel、Webpack、Rollup 的 10-100 倍，

esbuild进行转译（TypeScript → JavaScript、JSX/TSX → JavaScript）

配置：
```js
esbuild:{
    target: '',  // 指定转译目标
    exclude: []
}

```

## 缓存
Vite 会缓存 esbuild 的预构建结果（存于 node_modules/.vite）
```js
export default defineConfig({
  cacheDir: '.vite-cache', // 自定义缓存目录（建议加入 .gitignore）
  optimizeDeps: {
    esbuildOptions: {
      cache: true, // 开启 esbuild 依赖缓存（默认开启，确保不关闭）
    },
  },
});
```

##  优化资源处理
esbuild 压缩速度比 Terser 快 50-100 倍