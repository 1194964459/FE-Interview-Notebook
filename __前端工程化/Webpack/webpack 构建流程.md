webpack看别人的文章，疑惑点：

```js
let action = "making webpack";
exports.action = action;
```

Compiler：Webpack 的 “总指挥官”，整个构建周期只存在一个 Compiler 实例。初始化后读取配置，创建构建上下文，调度后续所有阶段
Compilation：一次具体的构建过程，每次构建会创建一个 Compilation 实例。负责模块解析、依赖图谱构建、Chunk 生成等核心工作

// 
在运行过程中会广播事件，插件只需要监听它所关心的事件(也成为“钩子”)

> 事件和钩子在 Webpack 中本质相同，都是 “发布 - 订阅模式” 的实现，用于插件介入构建流程；
> 术语上更常用 “钩子”，因为它更贴合 Webpack 基于 tapable 的实现，也更准确描述 “在特定节点挂载逻辑” 的行为。tapable 本身的 API （如 tap、call）也以 “钩子” 为核心概念。

钩子的分类（Webpack 中的具体实现）：
Webpack 的钩子根据触发时机和行为，分为多种类型（由 tapable 定义），常见的有：
* 同步钩子（SyncHook）：同步触发，订阅者的逻辑按顺序执行；
* 异步并行钩子（AsyncParallelHook）：异步触发，所有订阅者的逻辑并行执行；
* 异步串行钩子（AsyncSeriesHook）：异步触发，订阅者的逻辑按顺序执行（前一个完成后再执行下一个）。


调用每个插件的 apply 方法
将插件挂载到 Compiler 的钩子上，


Webpack 在构建流程的关键节点（如 “开始编译”“生成 Chunk”“输出文件”）会 “发布” 一个信号；
插件通过 “订阅” 这个信号，在信号触发时执行自定义逻辑（如修改输出内容、打印日志）