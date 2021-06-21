# Render Props

Render Props 是一种在 React 组件之间使用**一个值为函数 (返回 React 元素) 的 prop** 共享代码的简单技术。

```js
<DataProvider render={data => (
    <h1>Hello {data.target}</h1>
)}/>
```

## 1. 使用 Render Props 来解决横切关注点（Cross-Cutting Concerns）
组件是 React 中最基础的代码复用单元，如何将一个组件**封装的状态或行为**共享给其他需要相同状态的组件并不总是显而易见？

样例：如何呈现一张在屏幕上 追逐鼠标 的猫的图片？

<Mouse> 组件中封装我们需要共享的行为。


现有两个组件：
<Mouse> 组件封装了所有关于监听 mousemove 事件和存储鼠标 (x, y) 位置的行为。
<Cat> 组件，是一张图片（猫）。

```js
// Mouse 组件
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/* ...但我们如何渲染 <p> 以外的东西? */}
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}
```

```js
// Cat 组件 
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}
```

可以有两种方案来解决上面的问题：

**法1**：
```react
<Mouse
    <Cat mouse={this.state} />
/>
```
这种方法适用于我们的特定用例，但我们还没有达到**以 可复用的方式 真正封装行为**的目标。

**法2**：
为 <Mouse> 提供一个函数 prop 来动态的确定要渲染什么（一个 render prop）。

```js
class MouseTracker extends React.Component {
  render() {
    return (
        <div>
            <h1>移动鼠标!</h1>
            <Mouse render={mouse => (
                <Cat mouse={mouse} />
            )}/>
        </div>
    );
  }
}
```

```js
// <Mouse> 组件的 render 函数中
render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          使用 `render`prop 动态决定要渲染的内容，this.props.render指的就是作为 prop 的函数；<cat>组件不动
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
```  

**render prop 是一个用于告知组件需要渲染什么内容的函数 prop**。

## 2. Props 不一定是 render

render prop 是因为模式才被称为 render prop ，你不一定要用名为 render 的 prop 来使用这种模式。事实上， 任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”。

