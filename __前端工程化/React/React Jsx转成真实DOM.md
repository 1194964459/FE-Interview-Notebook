# React中JSX 是如何转换成 真实DOM的？

参考：[JSX 转换为真实 DOM](https://www.doubao.com/thread/wec239e963db055a5)

JSX 转换为真实 DOM 的过程主要分为JSX 转译、虚拟 DOM 创建、Diffing 算法对比和真实 DOM 更新

1. JSX 转译为 JavaScript 代码（编译阶段）
JSX 本质是语法糖，浏览器无法直接识别，必须先通过转译工具（如 Babel）转换为标准的 JavaScript 代码。

例如，一段简单的 JSX：
```js
const element = <h1 className="title">Hello, React</h1>;
```
会被 Babel 转译为React.createElement()函数调用：
```js
const element = React.createElement(
  'h1', // 标签名/组件
  { className: 'title' }, // 属性对象（props）
  'Hello, React' // 子节点（children）
);
```

2. 创建虚拟 DOM（Virtual DOM）

React.createElement()调用后会返回一个虚拟 DOM 对象（简称 VDOM），它是对真实 DOM 的轻量 JavaScript 描述，结构类似：
```js
// 上述JSX转译后生成的虚拟DOM对象
const element = {
  type: 'h1', // 元素类型（标签名或组件）
  props: {
    className: 'title',
    children: 'Hello, React' // 子节点（可能是文本或其他虚拟DOM）
  },
  // 其他内部属性（如key、ref等）
};
```

3. Diffing 算法（协调阶段）
参考：[基于Fiber的渲染流程](./3.1__基于Fiber的渲染流程.md)

4. 最终，通过```ReactDOM.render()```（或在 React 18 + 中使用```createRoot().render()```）触发整个流程，将虚拟 DOM 的初始版本渲染为真实 DOM：
