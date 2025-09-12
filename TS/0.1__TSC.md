# TSC

tsc 是 TypeScript 开发的基础工具，负责将 TypeScript **代码转换**为可执行的 JavaScript，并通过严格的**类型检查**保障代码质量。

常用语法：
* ```tsc --init```：生成 tsconfig.json
* 监听文件变化：```--watch（或简写为-w ）```，如：```tsc index.ts --watch```
* 基于配置文件，编译整个项目：```tsc```，自动读取 tsconfig.json 并编译所有匹配的文件

## 与 Babel 的区别：  
Babel 主要用于语法转换（如 ES6→ES5），但不支持 TypeScript 的类型检查；tsc 既做类型检查也做语法转换。
