setTimeout 不会绝对准确执行，它的实际执行时间≥指定的延迟时间（delay参数）

根本原因：JS是单线程、事件循环、任务队列


`setTimeout(fn, delay)` 的本质是：在 delay 毫秒后，将回调函数 fn 推入「宏任务队列」，具体的执行时机还应该看「当前主线程是否空闲」以及「队列中是否有更早的任务」。

若主线程被阻塞、微任务队列中还有需要执行的，这些都会影响setTimeout的执行时机

若需要高精度定时：
* requestAnimationFrame，适合动画，与浏览器刷新频率保持一致
* requestIdleCallback，非紧急任务，浏览器空闲时执行
* Web Workers：耗时计算放到worker，避免阻塞主线程