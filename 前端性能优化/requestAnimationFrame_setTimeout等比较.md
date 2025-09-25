# requestAnimationFrame、setTimeout、requestIdleCallback 三者对比

1. 每一轮 Event Loop 都会伴随着渲染吗？
2. requestAnimationFrame 在哪个阶段执行，在渲染前还是后？在 microTask 的前还是后？
3. requestIdleCallback 在哪个阶段执行？如何去执行？在渲染前还是后？在 microTask的前还是后？
4. resize、scroll 这些事件是何时去派发的。

requestAnimationFrame：属于渲染相关任务，执行时机与渲染周期保持一致（如 60Hz 屏幕约每 16.7ms 一次）；每次重绘前，浏览器会收集所有 RAF 回调，批量执行后立即重绘。

setTimeout：属于宏任务。

执行时间不确定，延迟时间是“最早执行时间” 而非“精确时间”。

