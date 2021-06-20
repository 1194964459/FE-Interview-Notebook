# React 顶层API

## 一、React.Component
见[React.component](./React.component.md)

## 二、React.PureComponent
React.PureComponent 中以**浅层对比 prop 和 state** 的方式来**实现了该函数**。由于是浅层比较，因此如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。

深层数据结构发生变化时可调用 forceUpdate() 来确保组件被正确地更新。也可以考虑使用 immutable 对象加速嵌套数据的比较。

## 三、React.memo
```js
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```
如果你的组件在**相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用**，以此通过**记忆组件渲染结果的方式来提高组件的性能表现**。这意味着**在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果**。

React.memo 仅检查 props 变更。
默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。
```js
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  返回值刚好与shouldComponentUpdate 方法的返回值相反。
  */
}
export default React.memo(MyComponent, areEqual);
```


## 四、创建 React 元素:
* createElement()
```js
React.createElement(
    type,
    [props],
    [...children]
)
```
* createFactory()：已废弃，建议使用 JSX 或直接调用 React.createElement() 来替代它。

## 五、转换元素：
* cloneElement()

React.cloneElement() 几乎等同于：

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。新的子元素将取代现有的子元素，而来自原始元素的 key 和 ref 将被保留。

* React.isValidElement()：验证对象是否为 React 元素，返回值为 true 或 false。
* React.Children：提供了用于处理 this.props.children 不透明数据结构的实用方法。
    > React.Children.map
    > React.Children.forEach
    > React.Children.count
    > React.Children.only
    > React.Children.toArray

## 六、Fragments：
* React.Fragment：该组件能够在不额外创建 DOM 元素的情况下，让 render() 方法中返回多个元素。

也可以使用其简写语法 <></>。

## 七、Refs
* React.createRef：创建一个能够通过 ref 属性附加到 React 元素的 ref。
见[Ref](./Refs.md)

* React.forwardRef
不重要，略！


## 八、Suspense
* React.lazy：允许你定义一个动态加载的组件。目前支持度不好，暂不详细探讨

* React.Suspense

## 九、Hook
见：[React Hook](./React_Hook.md)
