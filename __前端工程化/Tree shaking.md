# Tree shaking 
Tree Shaking 是一种代码优化技术，核心目标是**移除 JavaScript 代码中未被使用的部分（dead code）**，从而*减小最终打包产物的体积，提升应用加载性能*。

## 一、实现条件

Tree Shaking 的**前提**是依赖 ES6 模块的静态特性（编译时确定导入导出关系）

[静态分析为什么能识别“未被引用的代码”？](./Tree%20shaking_静态分析.md)

**1. 使用 ES6 模块语法**   
必须使用 import/export，不能使用 CommonJS 的 require()/module.exports（动态特性导致无法静态分析）。

* ESM 是静态的，模块的导入和导出在编译时（代码解析阶段）就能确定，
* 运行时（如 CommonJS 的 require()）是动态的，无法提前确定依赖关系。


**2. 死代码消除（Dead Code Elimination）**：     
打包工具（如 Webpack、Rollup）先通过静态分析标记出 “未被引用的导出内容”，再结合代码压缩工具（如 Terser）将这些标记的死代码从最终产物中删除。

### 常见工具支持情况
* Webpack：v2+ 支持，需配置 mode: production，并确保 optimization.usedExports 为 true（标记未使用代码），配合 terser-webpack-plugin 进行删除。

* Rollup/Vite：默认支持 Tree Shaking，无需额外配置（Vite 基于 Rollup 打包）。
    > 原生支持，对 Tree Shaking 优化更彻底（适合库打包）。    
    > 生产环境默认启用，开发环境不进行 Tree Shaking（为了速度）。


## 二、Webpack 有哪些 tree shaking的 配置项？
Webpack 中的 Tree Shaking 功能**依赖 ES6 模块（ESM）的静态特性**，其配置需**围绕“启用静态分析”“标记副作用”“配合压缩工具删除死代码” 三个核心环节**展开

### 1. 基础配置
Tree Shaking 的核心前提是 Webpack 能识别 ESM 模块（import/export），并**关闭**可能*破坏静态分析*的功能。

**(1) mode: "production**"
* 生产模式(mode: "production")下默认启用 Tree Shaking 相关优化。
    * 自动开启 optimization.usedExports（标记未使用的导出）；
    * 自动集成 Terser（压缩工具，删除标记的死代码）；
    * *禁用开发环境的冗余功能*（如模块热更新），避免干扰静态分析。

* 开发模式（development）下，默认关闭 Tree Shaking

**(2) 代码保留 ESM 语法**  
确保源代码或第三方库中直接使用 import/export，而非被转译为 CommonJS 的 require/module.exports。 例如，使用 Babel 时**需禁用模块转换**：其预设的 modules 应设为false（避免 Babel 将 ESM 转为 CommonJS）。若 modules 设为 'commonjs'（默认值），Babel 会将 import 转为 require

```js
// webpack.config.js 中 babel-loader 配置
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 关键：设置 modules: false，避免 Babel 将 ESM 转为 CommonJS
              ['@babel/preset-env', { modules: false }]
            ]
          }
        }
      }
    ]
  }
};
```

**(3) 第三方库提供 ESM 版本（resolve.mainFields）**     
Webpack 会优先读取其 package.json 中 module 字段指向的 ESM 入口文件（若存在）。例如：
```js
// 某第三方库的 package.json
{
  "module": "dist/esm/index.js", // ESM 版本入口
  "main": "dist/cjs/index.js"   // CommonJS 版本入口
}
```
在 Webpack 中配置优先解析 module 字段：
```js
// webpack.config.js
module.exports = {
  resolve: {
    mainFields: ['module', 'main'] // 先读 ESM 入口，再读 CommonJS 入口
  }
};
```

### 2. 标记未使用代码

> **疑问❓：什么是 “副作用”**？   
> “副作用” 指代码执行时对外部环境产生的隐式影响，而非单纯的函数返回值。例如：   
> * 修改全局变量（window.xxx = 123）
> * 操作 DOM（document.body.appendChild(...)）
> * 注册事件监听（window.addEventListener(...)）
> * 引入 CSS 样式（import './style.css'，会注入样式到 DOM）
> * 日志输出（console.log(...)）

<br/>
Webpack 通过 **optimization** 下的配置项，控制 **“如何标记未使用的导出”** 和 **“是否保留副作用代码”**。
<br/><br/>
**(1) optimization.usedExports**   
开启 “未使用导出标记”，Webpack 会在打包过程中分析每个模块的导出，对**未被引用的导出成员**添加 <code>/* unused harmony export xxx */ </code>注释（仅在生产模式下可见），为后续压缩工具（Terser）提供删除依据。

**(2) optimization.sideEffects**   
控制 Webpack 是否分析模块的”副作用“！   
* 当 sideEffects为**false**：不启用副作用分析，**假设所有模块都无副作用**，会**直接删除未使用的模块**（风险较高，需确保代码无隐藏副作用）。
* 当 sideEffects为**true**：启用...，并且会结合 package.json 的 sideEffects 字段，判断模块是否有副作用；   
**package.json 的 sideEffects 字段**用来表示哪些模块有副作用！取值有：boolean（true/false）或 string[]（文件路径数组）
    * 若**sideEffects为true**：包中的**所有文件都可能有副作用**。
    * 若**sideEffects为false**：包中的**所有文件都没有副作用**。
    * 若**sideEffects字段不存在**：取其默认值（true），即：Webpack 会保守地认为“**所有模块都可能有副作用**”，可能*保留未使用的代码*（Tree Shaking 不彻底）。
    * 若**sideEffects为[]**：表示**所有模块都无副作用**，Webpack 可安全*删除未使用模块*；
    * 若sideEffects**存在且不为[]**：仅数组中提到的那些有副作用！

    ```js
    // package.json
    {
    "sideEffects": [
        "./src/styles/*.css", // CSS 文件有副作用（注入样式到 DOM），不可删除
        "./src/utils/global-init.js" // 初始化全局变量的文件，有副作用
    ]
    }
    ```
**(3)optimization.innerGraph（Webpack 5+）**   
不仅仅分析模块级别的导入导出，能更细粒度地分析模块内部的依赖关系（如函数、变量的引用）。该功能是Webpack 5 新增的 “内部依赖图” 优化！

例如，一个模块导出多个函数，其中函数 A 依赖函数 B，但函数 A 未被使用 ——innerGraph 能识别到 “函数 B 仅被未使用的函数 A 依赖”，从而将两者一起标记为死代码。

```js
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true, // 未使用导出标记！   为后续压缩做准备！(借助 Terser 压缩)
    sideEffects: true, // 是否分析模块的”副作用“？需配合 package.json 的 sideEffects 使用
    innerGraph: true // 细粒度分析模块内部的依赖关系，需 Webpack 5+ 
    minimize: true // 启用压缩，删除死代码
  }
};
```

### 3. 确保死代码被删除
Webpack 标记未使用代码后，需依赖压缩工具（如 Terser）完成最终的 “删除” 操作

**1. optimization.minimize**   
**控制是否启用代码压缩**，压缩工具会删除 Webpack 标记的未使用代码（usedExports 标记的内容）。   
> 注意：若 minimize: false，即未启用代码压缩！即使 usedExports 标记了未使用代码，也不会被删除，Tree Shaking 最终失效。
```js
module.exports = {
  optimization: {
    minimize: true, // 生产模式默认 true，开发模式默认 false
    minimizer: [
      // 自定义压缩工具（默认使用 TerserPlugin）
      new require('terser-webpack-plugin')({
        // Terser 配置（可选）
        terserOptions: {
          compress: {
            unused: true, // 删除未使用的变量/函数（关键，配合 usedExports）
            dead_code: true // 删除死代码（默认开启）
          }
        }
      })
    ]
  }
};
```

## 三、Rollup 的tree shaking实现
Rollup 从设计之初就**只原生支持 ESM**（import/export），不处理 CommonJS 等动态模块系统（需通过插件转换），这种确定性让 Rollup 能在**编译时（打包阶段）精准分析模块间的依赖关系**。


### 核心流程：从依赖分析到死代码剔除
1. **解析代码生成 AST**，收集导出成员
2. **构建依赖图谱**，精准追踪导出成员的引用    
Rollup 可追踪每个导出成员**被哪些模块实际使用**，可以 **无歧义地判断每个导出成员的引用状态**。
3. 结合 “**副作用**” 判断，筛选可删除的代码   
“副作用”（如修改全局变量、操作 DOM、注册事件）是 Tree Shaking 的最大障碍 —— 即使代码未被引用，若有副作用也不能删除。   
Rollup 通过两种方式处理副作用：
    * 显式声明（package.json 的 sideEffects 字段）：同webpack中处理
    * 静态分析识别 “明显无副作用” 的代码：

4. 打包时**剔除未使用代码**，生成精简产物
Rollup 在打包时，默认不添加额外的模块包装代码（如 Webpack 的 __webpack_require__）。这种 “平坦化” 输出让未使用的代码更易被直接剔除。
    * 在代码生成阶段，Rollup 会忽略所有被标记为 “**未被引用且无副作用**” 的**导出成员及其依赖代码**；
    * 最终产物中**仅保留被引用的代码和有副作用的代码**。

### Rollup的 Tree shaking 为何比 Webpack 更彻底？
* **以 ES6 模块（ESM）为原生设计目标**    
 Rollup 从诞生起就专为 ESM 设计，默认只处理 ESM 模块，不支持 CommonJS（需通过插件转换）。这种设计让 Rollup 无需处理动态模块系统的不确定性（如 CommonJS 的 require），能更精准地：

    * 遍历模块的导入导出关系，构建清晰的依赖图谱；
    * 追踪每个导出成员（如 export const a = ...）是否被实际引用，无歧义地标记未使用代码。

* **无模块包装代码干扰**，直接“平坦化” 输出（如 Webpack 的 __webpack_require__）
    > 未使用代码更易暴露    
    > 死代码消除更彻底

    而 Webpack 为了支持**代码分割、动态导入**等复杂功能，会在**打包产物中注入大量运行时代码**（模块包装器、依赖管理逻辑），这些代码可能 *“包裹” 未使用的导出，增加死代码消除的难度*。

* 细粒度的内部依赖分析：
    Rollup 不仅分析模块级别的导入导出，还会追踪模块内部的变量、函数引用。
* 默认假设 “无副作用”：
若**未声明 sideEffects**，Rollup 会**默认模块无副作用**（除非代码中明显有副作用操作），从而更激进地删除未使用代码；
而 Webpack 默认假设 “可能有副作用”，更保守。
