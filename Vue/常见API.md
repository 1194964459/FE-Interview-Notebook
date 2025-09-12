# 常见API

### nextTick()：刷新 DOM
Vue 中**更改响应式状态**时，Vue 不会立即执行 DOM 更新。而是将这些更新操作缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，在一个tick周期内 仅执行一次更新。
> “tick”通常指的是 JavaScript 事件循环中的一个宏任务
```js
function nextTick(callback?: () => void): Promise<void>
```
参数callback是可选的，表示DOM更新完成后执行的回调。
```js
const count = ref(0)

async function increment() {
  count.value++

  // DOM 还未更新
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM 此时已经更新
  console.log(document.getElementById('counter').textContent) // 1
}
```
