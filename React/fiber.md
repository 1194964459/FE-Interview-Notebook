# fiber
参考：
* https://juejin.cn/post/6844903975112671239



**1. 背景**：
以前的渲染机制：

React更新是从根节点全量更新；递归渲染（*不能中断*？？）

若节点多、层级特别深时，由于 JS 是单线程的、UI 渲染 和 JS执行是互斥的，所以会出现卡死现象。

2. 帧
屏幕刷新率：60次/秒

每秒绘制的帧数（FPS）达到60时，页面是流畅的；小于60时，用户会感觉到卡顿；

**并发的关键是你有处理多个任务的能力，不一定要同时。**
**并行的关键是你有同时处理多个任务的能力。**


