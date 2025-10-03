```javascript
/**
 * 判断是否为null 
 * null == undefined 始终为true，但是 null === undefined 为false
 */
if(tmp === null) {   // 此处是===
    console.log("null");
}

/**
 * 判断是否为undefined
 */
if (typeof tmp == "undefined"){
    console.log("undefined");
}

/**
 * 判断:是否为NaN?
 * NaN与任何值都不相等，包括NaN本身
 */
var tmp = 0/0;
if(isNaN(tmp)){
    console.log("NaN");
}
```


## Null 与 Undefined
* Undefined：“声明 但未初始化的变量“ 或 “对象属性不存在”时，值为Undefined
* Null是空对象


判断 null 必须用 === null，避免用 typeof（因为会返回 'object'）。
判断 undefined 可用 typeof x === 'undefined' 或 x === undefined。

* 数值转换：undefined会转换为 NaN，null 转为0
* 布尔值转换：都会转为false
```js
null == undefined   // true
null === undefined   // false
```