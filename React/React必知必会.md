# React

**React 是一个开源前端 JavaScript 库，用于构建用户界面，尤其是单页应用程序。它用于处理 Web 和移动应用程序的视图层**。

**React 的主要特性是：**
* 考虑到 DOM 操作内存开销大，React 使用**虚拟 DOM（VirtualDOM）** 替代了真实 DOM（RealDOM）
* 支持**服务端渲染**
* 遵循**单向数据流**或**数据绑定**
* 使用**组件**来进行视图开发

## 一、JSX
JSX 是 ECMAScript 的**类似 XML 的语法扩展**（缩写是 JavaScript XML）。实际上，它只是为<code> React.createElement()</code> 函数提供语法糖，为我们**提供了在 JavaScript 中使用类 HTML 模板语法的能力**。

```JS
// JSX 如下：
const element = <h1>Hello, world!</h1>;
```
### 为什么使用JSX?
React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。

React 并没有采用将**标记与逻辑进行分离**到不同文件这种人为地分离方式，而是通过将二**者共同存放在称之为“组件”的松散耦合单元**之中，来实现关注点分离。

* 在 JavaScript 代码中将 JSX 和 UI 放在一起时，简单，阅读方便。
* 使 React 显示更多有用的错误和警告消息。

### JSX 特点：
* JSX 是一个表达式，编译之后，JSX 表达式会被转为普通 JS 函数调用，并且对其取值后得到 JavaScript 对象。也就是说，你可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX
```jS
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);

// 可转换为：
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);
```
<code>React.createElement()</code>最终会创建一个这样的对象：  
```JS
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world!'
    }
};
```

* JSX 属性名 使用 camelCase（小驼峰命名）来定义；
* class 变成了 className；tabindex 则变为 tabIndex
* **JSX 可防止注入攻击**，因为React DOM 在**渲染用户输入内容之前，默认会进行转义**。
* JSX 可以生成 React 元素，React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

## 二、元素渲染
将 React 元素渲染为真实的 DOM 节点，只需把它们一起传入 ReactDOM.render()

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

## 三、组件和props

**函数组件**：接受参数props，并返回一个 React元素
```js
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

**类组件**
```js
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

**props 是只读的**

## 四、state和生命周期
State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

除 props、state 外，还可以向 class 中随意添加不参与数据流（比如计时器 ID）的额外字段。

**1. 正确使用state**:
* 不要直接修改 State, 使用<code>setState()</code>，构造函数是唯一可以给 this.state 赋值的地方；
* 出于性能考虑，React 会把多个 State 的更新合并成一个调用；
* State 的更新可能是异步的，所以不要依赖他们的值来更新下一个状态；
* <code>setState()</code> 接收一个函数而不是一个对象，这时 函数会用上一个state作为第一个参数，可解决上一步的问题；
```JS
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```


**2. 数据流是“自上而下”或是“单向”的**。

## 五、事件处理

**1. React事件与Dom事件区别**：
* 事件的命名：react采用小驼峰式（camelCase）onClick，html中是纯小写onclick。
* 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
* 取消默认事件：Dom中return false可取消，React中则必须显示使用preventDefault。

```html
<!-- 传统的 HTML： -->
<button onclick="activateLasers()">
  Activate Lasers
</button>

<!-- React 事件： -->
<button onClick={activateLasers}>
    Activate Lasers
</button>  
```

**2. React 事件中的this**

你必须谨慎对待 JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。
```html
<!-- 事件方法中 this 值为 undefined -->
<button onClick={this.handleClick}>Click me</button>
```

有几种绑定this的方法：

```html
<!-- 法1: 方法后面添加 () -->
<button onClick={this.handleClick()}>Click me</button>  

<!-- 法2：回调函数中使用箭头函数 -->
<button onClick={() => this.handleClick()}>

<!-- 法3: -->
<button onClick={this.deleteRow.bind(this)}>Delete Row</button>
```

```js
// 法4：使用 ES6 class 语法定义一个组件，在构造函数中绑定
class Toggle extends React.Component {
    constructor(props) {
        super(props);

        // 为了在回调中使用 `this`，这个绑定是必不可少的
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
        <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        );
  }
}
```

**3. 向事件处理程序传递参数**
```html
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。

React 的事件对象 e 会被作为第二个参数传递：
* 通过箭头函数的方式，事件对象必须**显式的进行传递**，
* 通过 bind 的方式，事件对象以及更多的参数将会被**隐式的进行传递**。

## 六、列表 key
* key 帮助 React **识别哪些元素改变了，比如被添加、删除**。
* 一个元素的 key 最好是个**一个独一无二的字符串**。
* **不建议使用索引来用作 key 值，因为这样做会导致性能变差**，还可能引起组件状态的问题。
* 如果你选择不指定显式的 key 值，那么 React 将**默认使用索引作为列表项目的 key 值**。


JSX 允许在大括号中嵌入任何表达式，所以我们可以内联 map() 返回的结果：

```js
function NumberList(props) {
    const numbers = props.numbers;
    
    return (
        <ul>
            {numbers.map((number) =>
                <ListItem key={number.toString()} value={number} />
            )}
        </ul>
    );
}
```



