# Hook API 索引

## 一、基础 Hook

### useState

**1. 函数式更新**

将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值（若更新后函数返回值与当前 state 完全相同，则不会重新渲染）。

```js
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

> 注意：与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。如下：
```js
setState(prevState => {
  // 也可以使用 Object.assign
  return {...prevState, ...updatedValues};
});
```

**2. 惰性初始 state**
* initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。
* 如果**初始 state 需要通过复杂计算获得，则可以传入一个函数**，在函数中计算并返回初始的 state，此**函数只在初始渲染时被调用**：
```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

**3. 跳过 state 更新**
<!-- todo 不知道具体干了啥 -->
调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。

### useEffect



### useContext

## 二、额外的 Hook

### useReducer

### useCallback

### useMemo


### useRef


### useImperativeHandle


### useLayoutEffect

### useDebugValue




