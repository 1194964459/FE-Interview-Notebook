# Worker

参考：
http://www.ruanyifeng.com/blog/2018/07/web-worker.html
https://juejin.cn/post/6844903736238669837

https://www.doubao.com/chat/13679743013532162

Web Worker 允许在主线程之外创建独立的工作线程，执行 JavaScript 代码而不阻塞主线程。这对于处理计算密集型任务、大数据处理或耗时操作非常有用，可以显著提升页面的响应速度和用户体验。

基本流程是：

> 允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。


## 一、Web Worker 基本特点：

（1）同源限制：

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。（相同域名、协议、端口）。

（2）DOM 限制：

Worker 线程无法直接操作 DOM，只能通过消息通知主线程更新 UI。
因此无法访问：
* document、window、parent等DOM相关对象，但是，Worker 线程可以navigator对象和location对象。
* alert()、confirm() 等UI方法。

（3）独立上下文：

Worker 有自己的全局对象（在浏览器中是 self，而非 window）。
Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

（4）不分API可用：

* fetch()：发起网络请求。
* WebSocket：创建 WebSocket 连接。
* IndexedDB：进行本地存储操作。
* setTimeout、setInterval：定时器。
* importScripts()：导入外部脚本（仅限专用 Worker）。

（5）文件限制

Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。

## 二、性能优化建议
1. 合理使用 Worker

* 仅对真正耗时的任务使用 Worker，避免创建过多线程增加上下文切换开销。


2. 优化消息传递

* 减少主线程与 Worker 之间的消息传递频率，批量处理数据。
* 对大型数据（如 ArrayBuffer、ImageData）使用转移所有权机制，避免复制。

3. 生命周期管理

* 任务完成后及时终止 Worker，释放系统资源。
* 对长期运行的 Worker（如 Service Worker），合理管理其生命周期。
