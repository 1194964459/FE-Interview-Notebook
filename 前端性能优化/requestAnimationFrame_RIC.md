# requestAnimationFrame 与 requestIdleCallback
参考：[事件循环](../JS/事件/event-loop.md)

## 疑问：
1. 每一轮 Event Loop 都会伴随着渲染吗？
    不是，具体参考[事件循环 第4节](../JS/事件/event-loop.md)
2. requestAnimationFrame 在哪个阶段执行？  
    答：在渲染前执行，且在微任务之后。它的触发时机与浏览器的刷新频率同步，确保动画平滑且性能最优。具体阶段：`当前宏任务执行完毕 → 清空微任务队列 → 执行 requestAnimationFrame 回调 → 执行渲染（重排、重绘、合成）`

    浏览器只保证requestAnimationFrame的回调在重绘之前执行，没有确定的时间，何时重绘由浏览器决定，可能是在一次或多次事件循环的 UI render阶段。

3. requestIdleCallback 在哪个阶段执行？如何去执行？在渲染前还是后？在 microTask的前还是后？

    答：requestIdleCallback 用于在浏览器空闲时间执行低优先级任务。在浏览器渲染之后执行。
    具体阶段：`渲染完成后 → 浏览器判断当前是否有空闲时间（如帧预算未用完）→ 若空闲，执行 requestIdleCallback 回调`

## 一、requestAnimationFrame：
requestAnimationFrame：属于渲染相关任务，执行时机与渲染周期保持一致（如 60Hz 屏幕约每 16.7ms 一次）；每次重绘前，浏览器会收集所有 RAF 回调，批量执行后 再渲染。

requestAnimationFrame不是将多次DOM操作优化为1次重排，它的核心价值是：
* 确保在渲染前执行样式修改，与渲染周期精准同步，视觉上更流畅，避免 “样式修改时机与渲染周期错位” 导致的**闪烁或卡顿**。
* 如果页面在后台，RAF 会自动暂停，节省资源（而直接同步修改样式，即使在后台也会执行，可能浪费资源）。

### 适用场景：
1. 动画：DOM动画、Canvas/SVG 绘制
2. 批量DOM操作与样式更新：合并多个 DOM 修改合并为一次重绘，减少重排/重绘次数。
```js
// 批量更新列表项样式，合并为一次重绘
function updateListStyles(items) {
  // 使用RAF确保所有修改在同一渲染周期执行
  requestAnimationFrame(() => {
    items.forEach((item, index) => {
      item.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f5f5f5';
      item.style.opacity = 1; // 从隐藏状态渐显
    });
  });
}

// 调用示例：筛选后更新100个列表项
const filteredItems = document.querySelectorAll('.list-item');
updateListStyles(filteredItems);
```

3. 窗口scroll、resize、onmousemove 会频繁触发，用 requestAnimationFrame 做布局调整，限制 UI 更新频率与渲染周期一致，避免性能浪费。

示例1：平滑滚动到顶部
```js
function scrollToTop() {
  const scrollTop = window.scrollY;
  if (scrollTop > 0) {
    window.scrollTo(0, scrollTop - 20);
    requestAnimationFrame(scrollToTop); // 与渲染同步，平滑滚动
  }
}
```

示例2：懒加载（如图片、列表项）需要判断元素是否进入视口，但频繁调用getBoundingClientRect（布局 API）会触发重排。结合requestAnimationFrame可减少不必要的布局计算。
```js
// 懒加载图片：仅在元素进入视口时加载
function checkLazyLoad() {
  const lazyImages = document.querySelectorAll('img.lazy');
  
  requestAnimationFrame(() => {
    lazyImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      // 判断是否进入视口（上下左右各扩展200px预加载）
      const isInViewport = (
        rect.top < window.innerHeight + 200 &&
        rect.bottom > -200 &&
        rect.left < window.innerWidth + 200 &&
        rect.right > -200
      );
      
      if (isInViewport && !img.src) {
        img.src = img.dataset.src; // 加载图片
        img.classList.remove('lazy');
      }
    });
  });
}

// 监听滚动事件，触发视口检测
window.addEventListener('scroll', checkLazyLoad);
```

上面的代码还能再优化一下，用防抖、节流来限制执行频率：
```js
window.addEventListener('scroll', throttle(checkLazyLoad));
```

## 二、requestIdleCallback
属于低优先级任务，仅在浏览器 “空闲期” 执行。

回调函数会接收一个 deadline 参数，包含 timeRemaining() 方法，可判断当前空闲时间是否充足，避免占用主线程。

应用场景：日志上报、数据预加载、非紧急的 DOM 操作（如隐藏的列表渲染）。
```js
// 示例：空闲时上报用户行为日志
function logUserAction(action) {
  requestIdleCallback((deadline) => {
    // 检查是否有足够空闲时间
    if (deadline.timeRemaining() > 0) {
      fetch('/api/log', { method: 'POST', body: JSON.stringify(action) });
    } else {
      // 时间不足，下次空闲再执行
      requestIdleCallback(logUserAction.bind(null, action));
    }
  });
}
```

