# 模拟Object.create
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

```js
// 实现Object.create方法
function create(o) {
    function F() {};
    F.prototype = o;
    return new F();
}
let demo = {
    c : '123'
}
let cc = Object.create(demo)
```