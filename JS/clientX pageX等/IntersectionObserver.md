# IntersectionObserver

参考：
* [IntersectionObserver详解（豆包）](https://www.doubao.com/thread/w37f4cebba84c4767)
* [IntersectionObserver（mdn）](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

Intersection Observer API 是浏览器提供的一种**异步**观察**目标元素与其祖先元素或视口交叉状态**的方法。它能够高效检测元素是否可见，广泛应用于懒加载、滚动动画、曝光统计等场景。


主要方法：
```js
// 1. 创建观察器实例
const observer = new IntersectionObserver(callback, options)

// 2. 观察目标元素
observer.observe(targetElement);

// 3. 停止观察
observer.unobserve(targetElement);

// 关闭观察器
observer.disconnect();
```

配置选项 options，主要参数有2项：
```js
const options = {
    root,    // 根元素，默认为视口
    threshold  // 触发阈值，是个数组，每个值表示交叉比例（0表示刚进入，1表示完全可见），达到时触发回调。
}
```

callback回调：
```js
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.target
    //   entry.isIntersecting
    //   entry.intersectionRatio

    //   entry.boundingClientRect
    //   entry.intersectionRect
    //   entry.rootBounds
    //   entry.time
  });
};
```

## 特点：
优点：
* 异步执行，不阻塞主线程，性能优异
* 自动处理滚动、缩放等场景，无需手动监听事件
* 支持批量观察多个元素

缺点：
* 无法获取实时的滚动位置信息
* 不支持 IE 浏览器，需兼容时可使用 polyfill

应用场景：懒加载、滚动动画、曝光统计、无限滚动加载更多内容。
