# React 组件通信、状态管理方式

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
 - Context API：createContext创建全局上下文、useContext，避免Props层层传递
 - 通过共同的父组件作为中间层props传递数据（状态提升）。如：将状态传给 子组件A、修改状态的方法传给 子组件B

**4. 跨层组件通信**：Context API

## 状态管理方式
* setState
* useState
* useReducer，参考：[Hooks](./1.3__Hooks.md)
* Redux，参考：[Redux](./6.1__Redux.md)
