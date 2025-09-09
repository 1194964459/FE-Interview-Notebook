# Context

React 中，数据是通过 props 属性自上而下（由父及子）进行传递的，但此种用法对于某些类型的属性而言是极其繁琐的。

Context 提供了一种在组件之间共享此类值的方式（不同层级的组件需要访问同样一些的数据），而不必显式地通过组件树的逐层传递 props。请谨慎使用，因为这会使得组件的复用性变差。

如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。

一种无需 context 的解决方案是将 Avatar 组件自身传递下去，因而中间组件无需知道 user 或者 avatarSize 等 props：（**传递组件，这种方式不是很懂**）

```js
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```

## API
**1. React.createContext**
```JS
const MyContext = React.createContext(defaultValue);
```
* 创建一个 Context 对象。
* 当 React 渲染一个**订阅了这个 Context 对象的组件**，这个组件会**从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值**。
* **只有**当组件所处的树中**没有匹配到 Provider 时，其 defaultValue 参数才会生效**。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。

**2. Context.Provider**
```JS
<MyContext.Provider value={/* 某个值 */}>
```
每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

* Provider 接收一个 **value 属性，传递给消费组件**。**value 值发生变化**时，它内部的**所有消费组件都会重新渲染**。
* **一个 Provider** 可以和**多个消费组件**有对应关系。
* **多个 Provider 可以嵌套使用**，里层的会覆盖外层的数据。
* Provider 及其内部 consumer 组件**都不受制于 shouldComponentUpdate 函数**，因此当 **consumer 组件在其祖先组件不更新的情况下也能更新**。

**3. Class.contextType**
* **挂载在 class 组件** 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。  
* 此属性能让你**使用 this.context 来消费最近 Context 上的那个值**。你**可以在任何生命周期中访问到它，包括 render 函数中**。
```js
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;  // 使用 this.context 获取..
  }
  componentDidUpdate() {
    let value = this.context;
  }
  componentWillUnmount() {
    let value = this.context;
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;   // Context值 挂载在 Class 组件的 contextType 属性上
```

**4. Context.Consumer**
```js
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```
此组件可以让你在**函数式组件**中可以订阅 context 的变更。

<br/>
