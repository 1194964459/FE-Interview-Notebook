# React Hook

目录：

**1. 基础 Hook**
* useState
* useEffect
* useContext

**2. 额外的 Hook**
* useReducer
* useCallback
* useMemo
* useRef
* useImperativeHandle
* useLayoutEffect
* useDebugValue


Hook 是 **React 16.8 的新增特性**。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

Hook 没有破坏性改动：无需重写任何已有代码就可以在一些组件中尝试 Hook。没有计划从 React 中移除 class。 

Hook 是向下兼容的。

Hook 是一个特殊的函数，它可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。

Hook 不能在 class 组件中使用。

什么时候我会用 Hook？你在编写函数组件并意识到需要向其添加一些 state时，可以使用。

## 动机：
Hook 主要解决了如下几个问题：

**1. 在组件之间复用状态逻辑很难**    

使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。

**2. 复杂组件变得难以理解**

* 通常，组件起初很简单，但是逐渐会**被 状态逻辑 和 副作用 充斥** 变得难以维护。
    => 将 组件拆分为更小的粒度？不可能，因为状态逻辑无处不在。
    => 将 React 与 状态管理库 结合使用？会引入很多抽象概念，而且需要在不同的文件之间来回切换，复用会更加困难

* 为了解决这个问题，**Hook 将组件中相互关联的部分拆分成更小的函数**（比如设置订阅或请求数据），而并非强制按照生命周期划分。

**3. 难以理解的 class**
* class 组件会无意中鼓励开发者使用一些**让优化措施无效的方案**。
    => class 不能很好的压缩，
    => 使**热重载**出现不稳定的情况。

* 为了解决这些问题，Hook 使你在**非 class 的情况下可以使用更多的 React 特性**。 

## 一、使用 State Hook

**useState** 就是一个 Hook 。通过在函数组件里调用它来给组件添加一些内部 state。
类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。

**1. 声明 State 变量**
```js
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量
  const [count, setCount] = useState(0);
```

**(1) 调用 useState 方法的时候做了什么**? 它定义一个 “state 变量”。我们的变量叫 count(可以是任意名字)。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。

**(2) useState 需要哪些参数**？ useState() 方法里面唯一的参数就是初始 state。参数可以是数字、字符串、对象。

**(3) useState 方法的返回值是什么**？ 返回值为：当前 state 以及更新 state 的函数。

```js
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**2. 读取 State**

可以直接用 count：
```html
  <p>You clicked {count} times</p>
```

**3. 更新 State**

在函数中，我们已经有了 setCount 和 count 变量，所以我们不需要 this:
```html
  <button onClick={() => setCount(count + 1)}>
    Click me
  </button>
```

## 二、使用 Effect Hook
* **数据获取、设置订阅、手动更改 React 组件中的 DOM、设置定时器、日志记录** 都属于副作用。
* 默认情况下，React 会在**每次渲染后调用副作用函数（赋值给 useEffect 的函数）** —— **包括第一次渲染的时候**。即effect 在每次渲染的时候都会执行。


effect 的执行时机
useEffect 会在浏览器布局与绘制之后延迟执行，但会保证在任何新的渲染前执行。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。



**在 React 组件中有两种常见副作用操作：需要清除的、不需要清除的**。

### 1. 无需清除的 effect
* 有时候，我们只想在 React 更新 DOM 之后运行一些额外的代码。比如发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作。

* **useEffect** 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 <code>componentDidMount、componentDidUpdate 和 componentWillUnmount</code> 具有相同的用途，只不过**被合并成了一个 API**。useEffect 会在**每次渲染后（第一次渲染之后和每次更新之后）**都执行。不用再去考虑“挂载”还是“更新”，这种更易被接受！

  > 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect（多数情况下，不需要同步执行）不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 2. 需要清除的 effect
* 清除工作是非常重要的，如：订阅外部数据源。可以防止引起内存泄露！
* 在 **React class** 中，会在 componentDidMount 中设置订阅，并在 componentWillUnmount 中清除它。**effect 中，添加和删除订阅 是在同一个地方执行**。
* **为什么要在 effect 中 返回一个函数**？React 将会在执行清除操作时调用它。
* **React 何时清除 effect**？ React 会在**组件卸载的时候执行清除操作，即调用函数**。

<!-- todo? -->
避免每次更新都触发 effect 的执行？？？


```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    // 添加订阅
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    // return 一个函数，执行订阅清除逻辑
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

### 3. 其他考虑

**（1）使用多个 Effect 实现关注点分离**

使用 Hook 其中一个目的就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。

* **Hook 允许我们按照代码的用途分离他们**， 而不是像生命周期函数那样。

* React 将**按照 effect 声明的顺序依次调用组件中的*每一个* effect**。

**（2）为什么每次更新的时候都要运行 Effect**？

示例：显示好友是否在线的 FriendStatus 组件，组件挂载后订阅好友的状态，并在卸载组件的时候取消订阅，但是当组件已经显示在屏幕上时，friend prop 发生变化时会发生什么？ 我们的组件将继续展示原来的好友状态。这是一个 bug。在 class 组件中，我们需要添加 componentDidUpdate 来解决这个问题：

```js
componentDidUpdate(prevProps) {
  // 取消订阅之前的 friend.id
  ChatAPI.unsubscribeFromFriendStatus(
    prevProps.friend.id,
    this.handleStatusChange
  );
  // 订阅新的 friend.id
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```

* Class组件中： **忘记正确地处理 componentDidUpdate** 是 React 应用中常见的 bug 来源。

* 使用Hook：它**会在调用一个新的 effect 之前对前一个 effect 进行清理**。并不需要特定的代码来处理更新逻辑，因为 useEffect 默认就会处理。

**（3）通过跳过 Effect 进行性能优化**

在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。

* class 组件中：我们可以通过在 **componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决**：
```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

* 使用Hook时：如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，**只要传递数组作为 useEffect 的第二个可选参数**即可，若数组中所有元素都相等，则不渲染。对于 有/无清除操作的 effect 同样适用:

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

```js
// 再比如，我们不需要在每次组件更新时都创建新的订阅，而是仅需要在 source prop 改变时重新创建。
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

* 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这样的话，effect 内部的 props 和 state 就会一直拥有其初始值。

> **注意**：如果你要使用此优化方式，请确保**数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量**，否则你的代码会引用到先前渲染中的旧变量。

## 三、Hook 使用规则
Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

### 1. 只在最顶层使用 Hook
**不要在循环，条件或嵌套函数中调用 Hook**， 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就**能确保 Hook 在每一次渲染中都按照同样的顺序被调用**。这让 **React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确**。

````js
// 🔴 在条件语句中使用 Hook 违反第一条规则
if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
}
```
如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的*内部*：
```js
useEffect(function persistForm() {
    // 👍 将条件判断放置在 effect 中
    if (name !== '') {
        localStorage.setItem('formData', name);
    }
});
```

### 2. 只能在 React 函数中调用 Hook
不要在普通的 JavaScript 函数中调用 Hook。你可以：

✅ 在 React 的函数组件中调用 Hook
✅ 在自定义 Hook 中调用其他 Hook



## 四、自定义Hook

* 组件之间重用一些状态逻辑。目前为止，有两种主流方案来解决这个问题：**高阶组件和 render props**。**自定义 Hook** 可以让你在**不增加组件的情况下达到 状态逻辑复用 的目的**。

* 自定义 Hook 是一个函数，就像一个正常的函数，参数、返回值可以依据自己的需求来自定义。但是它的名字应该 **必须 且 始终 以 “use” 开头**，函数内部可以调用其他的 Hook。

* **在两个组件中使用相同的 Hook 会共享 state 吗？不会**。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。









