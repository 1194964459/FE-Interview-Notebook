# 实现一个JSON.stringify
```js
JSON.stringify(value[, replacer [, space]])：
```


转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。

* **非数组对象的属性**不能保证**以特定的顺序**出现在序列化后的字符串中。
* **布尔值、数字、字符串**的**包装对象**，自动转换成对应的原始值。
* **undefined、任意的函数、symbol 值**：
    > (1). 出现在**非数组对象的属性值中**时：被忽略；
    > (2). 出现在**数组中**时：转换成null
    > (3). 函数、undefined **被单独转换**时，会返回 undefined
    ```js
    JSON.stringify(function(){})   // undefined
    JSON.stringify(undefined)  // undefined
    ```

* 包含**循环引用的对象**，会抛出 TypeError 错误。
* 所有**以 symbol 为属性键的属性**都会被完全忽略
* **Date 日期**, 默认返回 string 字符串（默认调用 toJSON() 将其转为字符串） 
* **NaN、 Infinity、null**都会被当做 null。
* **Map/Set/WeakMap/WeakSet**，仅**会序列化 可枚举的属性**。





```js
function jsonStringify(obj) {
    let type = typeof obj;
    if (type !== "object") {
        if (/string|undefined|function/.test(type)) {
            obj = '"' + obj + '"';
        }
        return String(obj);
    } else {
        let json = []
        let arr = Array.isArray(obj)
        for (let k in obj) {
            let v = obj[k];
            let type = typeof v;
            if (/string|undefined|function/.test(type)) {
                v = '"' + v + '"';
            } else if (type === "object") {
                v = jsonStringify(v);
            }
            json.push((arr ? "" : '"' + k + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    }
}
jsonStringify({x : 5}) // "{"x":5}"
jsonStringify([1, "false", false]) // "[1,"false",false]"
jsonStringify({b: undefined}) // "{"b":"undefined"}"
```
