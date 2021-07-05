### 问：如何输出 1，2，3，4，5？
解析：本题主要是考察事件循环、块级作用域、bind、闭包等知识；

```javascript
for (var i = 1; i <= 5; i++) {
   setTimeout(function test() {
        console.log(i) // 依次输出：6 6 6 6 6
    }, i * 1000);
}
```

https://juejin.cn/post/6844903906279964686#heading-14

