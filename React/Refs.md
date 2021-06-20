# Ref
Refs 提供了一种方式，允许我们**访问** *DOM 节点* 或 *在 render 方法中创建的 React 元素*。

**适用场景**：
* 管理焦点，文本选择或媒体播放。
* 触发强制动画。
* 集成第三方 DOM 库。


## 创建 Refs
Refs 是使用 React.createRef() 创建的，并通过 **ref 属性附加到 React 元素**。在**构造组件时，通常将 Refs 分配给实例属性**，以便可以在整个组件中引用它们。
```js
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return <div ref={this.myRef} />;
    }
}
```

## 访问 Refs
当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。
```js
const node = this.myRef.current;
```
**ref 的值根据节点的类型而有所不同**：
* (1) 当 ref 属性用于 **HTML 元素**时，构造函数中使用 React.createRef() 创建的 ref 接收**底层 DOM 元素**作为其 current 属性。
```html
<input type="text" ref={this.textInput} />
```

* (2) 当 ref 属性用于**自定义 class 组件**时，ref 对象接收**组件的挂载实例**作为其 current 属性。
```html
 <CustomTextInput ref={this.textInput} />   
```
CustomTextInput为 自定义组件

* (3) **不能在函数组件上使用 ref 属性**，因为他们没有实例。


