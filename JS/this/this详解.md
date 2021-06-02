
## this 指向
1. 普通函数：指向'函数的调用者'，有个简便的方法就是看'函数前面有没有点'，如果有点，那么就指向点前面的那个值;
2. 箭头函数：指向'函数所在的所用域'，注意理解作用域，只有函数的{}构成作用域，对象的{}以及 if(){}都不构成作用域;

### 示例1:
```javascript
const obj = {
    name: 'objName'，
    say() {
        console.log(this.name);
    }，
    read: () => {
        console.log(this.name);
    }
}
obj.say(); // objName
obj.read(); // undefined
```
解释：obj.read() 是个箭头函数，this指向函数所在的作用域（注意不是obj，obj是对象，不能构成作用域），当前的作用域为全局环境，所以this.name为undefined，

### 示例2:
```javascript
const obj = {
    say: function () {
        setTimeout(() => {
            console.log(this)
        });
    }
}
obj.say(); // obj,此时this指的是定义他的obj
```

### 示例3：
```javascript
var length = 10;
function fn() {
 console.log(this.length);
}

const  obj = {
    length: 5,
    method: function(fn) {
        fn();
        arguments[0]();
    }
};

obj.method(fn, 1);
```
输出：10, 2
解释：arguments[0] (),可以看成是arguments.0(),调用这个函数的是arguments,此时this就是指arguments,this.length就是angument.length,就是传入的参数的总个数2

### 示例4：
```javascript
window.val = 1;
var obj = {
    val: 2,
    dbl: function() {
        this.val *= 2;
        val *= 2;
        console.log(val);
        console.log(this.val);
    }
}
obj.dbl(); // 2 4
var func = obj.dbl;
func(); // 8 8
```
解释：obj.dbl();执行这行代码时，this指的是obj，所以this.val === obj.val*=2,最后结果为4,val*=2 === window.val *= 2，最后结果是2
func()，执行这行代码时，func()没有任何前缀，this指的是window.func();所以此时this值得是window，this.val === window.val *= 2,此时window.val 为4，val*=2 === window.val *2,最后结果为8，最后console.log(this.val),与console.log(val),指的都是window.val，最后结果都是8