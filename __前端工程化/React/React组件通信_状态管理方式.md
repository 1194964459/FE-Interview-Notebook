# React 组件通信、状态管理方式
参考：https://www.doubao.com/thread/w7998c4b92f7c5727

## 组件通信方式
1. 父子通信：Props
2. 子组件向父组件通信：父组件通过 **props 传递 回调函数**，子组件调用该函数传递数据。
```js
// 父组件
function Parent() {
  const handleChildData = (data) => {
    console.log("从子组件接收：", data);
  };
  return <Child onSendData={handleChildData} />;
}

// 子组件
function Child(props) {
  const sendData = () => {
    props.onSendData("Hello from Child");
  };
  return <button onClick={sendData}>发送数据</button>;
}
```
**3. 兄弟之间通信**：
 1. **Context API**：createContext创建全局上下文、useContext，避免Props层层传递
    - 需注意：所有使用 useContext 消费该上下文的组件**都会强制重渲染**，并且**无法阻止 Context 触发的 render**，因此适合不怎么更新的状态，像主题、语言切换
 2. 通过共同的**父组件作为中间层**props传递数据（状态提升）。如：将状态传给 子组件A、修改状态的方法传给 子组件B

**4. 跨层组件通信**：Context API

## 状态管理方式
* setState
* useState
* useReducer，参考：[Hooks](./1.3__Hooks.md)
* Redux，参考：[Redux](./6.1__Redux.md)
