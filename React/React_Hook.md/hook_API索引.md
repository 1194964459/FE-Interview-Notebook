# Hook API 索引

## 基础 Hook

### 一、useState

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

### 二、useContext

```js
const value = useContext(MyContext);  
// 该操作类似于class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>
// useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。
```
* **接收**一个 context对象（<code>React.createContext 的返回值</code>） 并**返回**该 context 的当前值。
* 当前的 context 值**由**上层组件中距离当前组件最近的<code> <MyContext.Provider> 的 value prop</code> **决定**。
* *调用了 useContext 的 Hook组件*总会在 *context 值变化时*重新渲染。
> 如果重渲染组件的开销较大，你可以 通过使用 memoization 来优化。

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  // 新增
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## 额外的 Hook

### useReducer

### useCallback

```js
const memoizedCallback = useCallback(
  // 内联回调函数
  () => {
    doSomething(a, b);
  },
  // 依赖项数组
  [a, b],
);
```

返回一个 memoized 回调函数。

该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

```js
useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
```

### useMemo
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
返回一个 memoized 值。

* **把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值**。这种优化有助于避免在每次渲染时都进行高开销的计算。
  
  > 依赖项数组不会作为参数传给“创建”函数。

* 记住，**传入 useMemo 的函数会在渲染期间执行**。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

* 如果**没有提供依赖项数组**，useMemo 在每次渲染时都会计算新的值。
* 你**可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证**。


### useRef


### useImperativeHandle


### useLayoutEffect

### useDebugValue



