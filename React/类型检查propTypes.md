# 使用 PropTypes 进行类型检查

需引入 prop-types 库

可以使用 Flow 或 TypeScript 等 JavaScript 扩展来对整个应用程序做类型检查。

PropTypes 是 组件的 props 进行类型检查。

```js
import PropTypes from 'prop-types';  //

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {  //
  name: PropTypes.string
};
```

**常见的检查类型**
isRequired：必须数据
```js
  requiredFunc: PropTypes.func.isRequired,
```

**限制单个元素**
PropTypes.element 来确保传递给组件的 children 中只包含一个元素。

**默认 Prop 值**
```js
// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger'
};
```
也可在React Class 组件中声明 defaultProps 作为**静态属性**。
```js
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```
**若是函数组件**
```js
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}

export default HelloWorldComponent
```