# compose 函数组合 
参考：[函数柯里化](./函数柯里化.md)

**接收多个函数作为参数，并返回一个新的函数**。该函数在执行时，会从右到左依次调用这些函数，前一个函数的输出作为后一个函数的输入，最终返回最后一个函数的输出。函数组合 (compose) 是一种函数式编程模式。

没有 compose 时，多层函数调用可能写成嵌套形式：
```js
// 嵌套调用：可读性差，嵌套层级深时易混乱
fn1(fn2(fn3(x)));
```

有 compose 时，代码更扁平、直观：
```js
// 扁平化地组合成一个函数：执行顺序一目了然（fn3 → fn2 → fn1）
const composed = compose(fn1, fn2, fn3);
composed(x); // 等价于 fn1(fn2(fn3(x)))
```

compose 的价值，在于更高效地组合单一职责的函数，同时解决 “手动组合时的代码冗余、可读性差” 问题。

**compose 与 函数嵌套 的关系**：compose 并没有消除函数嵌套的执行逻辑（最终还是要嵌套执行），但它将嵌套的**代码写法**从 “手动多层嵌套” 变成了 “线性扁平组合”。

## 如何实现 compose？
```js
// 基础函数组合（从右到左执行）
function compose(...fns) {
  // 如果没有传入函数，返回一个返回自身的函数
  if (fns.length === 0) {
    return (arg) => arg;
  }
  
  // 如果只有一个函数，直接返回该函数
  if (fns.length === 1) {
    return fns[0];
  }
  
  // 组合多个函数，从右到左执行
  return fns.reduce(
      (pre, cur) => (...args) => pre(cur(...args))  // 第一个args是剩余参数rest，会将参数转为数组args；第二个args是扩展参数，调用的时候将数组中的各项分别展开来调用
  );
}
```

使用示例：
```js
function toUpper(str) {
  return str.toUpperCase();
}

function reverse(str) {
  return str.split('').reverse().join('');
}

function addPrefix(str) {
  return `Prefix: ${str}`;
}

// 组合函数：先反转，再转大写，最后添加前缀
const processStr = compose(addPrefix, toUpper, reverse);

console.log(processStr('hello')); // "Prefix: OLLEH"
// 执行顺序：reverse("hello") → toUpper("olleh") → addPrefix("OLLEH")
```