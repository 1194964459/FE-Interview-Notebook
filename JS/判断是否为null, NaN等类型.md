```javascript
/**
 * 判断是否为null 
 * null == undefined 始终为true  
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
