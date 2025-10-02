参考：https://www.cnblogs.com/xiaohuochai/p/5735901.html


## 一、默认绑定
共有全局环境、函数 独立调用、嵌套函数 独立调用、立即执行函数、闭包等五种情况。
* 全局环境中，this默认绑定到window
```javascript
console.log(this === window);//true
```

* '函数'独立调用时，this默认绑定到window
```javascript
function foo(){
    console.log(this === window);
}
foo(); //true
```

* '被嵌套的函数'独立调用时，this默认绑定到window
```javascript
var a = 0;
var obj = {
    a : 2,
    foo:function(){
            function test(){
                console.log(this.a);
            }
            test();
    }
}
obj.foo();//0
```

* 'IIFE立即执行函数'实际上是函数声明后直接调用执行
```javascript
// 该样例与上一个样例等同
var a = 0;
function foo(){
    (function test(){
        console.log(this.a);
    })()
};
var obj = {
    a : 2,
    foo:foo
}
obj.foo();//0

```

* 闭包：闭包的this默认绑定到window对象，除非有意修改
```javascript
var a = 0;
function foo(){
    function test(){
        console.log(this.a);
    }
    return test;
};
var obj = {
    a : 2,
    foo:foo
}
obj.foo()();//0
```
若要绑定到obj对象，可在嵌套函数中使用var that = this，然后在闭包中使用that替代this：
```javascript
var a = 0;
function foo(){
    var that = this;  
    function test(){
        console.log(that.a);
    }
    return test;
};
var obj = {
    a : 2,
    foo:foo
}
obj.foo()();//2
```


## 二、隐式绑定
* 直接对象所包含的函数调用时，this隐式绑定到该直接对象

## 三、隐私丢失
隐式绑定的函数丢失绑定对象，从而默认绑定到window。共有函数别名、参数传递、内置函数、间接引用、其他情况等5种情况。

* 函数别名
```javascript
var a = 0;
function foo(){
    console.log(this.a);
};
var obj = {
    a : 2,
    foo:foo
}
//把obj.foo赋予别名bar，造成了隐式丢失，因为只是把foo()函数赋给了bar，而bar与obj对象则毫无关系
var bar = obj.foo;
bar();//0
```
等同于：
```javascript
var a = 0;
var bar = function foo(){
    console.log(this.a);
}
bar();//0
```

* 参数传递
```javascript
var a = 0;
function foo(){
    console.log(this.a);
};
function bar(fn){
    fn();
}
var obj = {
    a : 2,
    foo:foo
}
//把obj.foo当作参数传递给bar函数时，有隐式的函数赋值fn=obj.foo。与上例类似，只是把foo函数赋给了fn，而fn与obj对象则毫无关系
bar(obj.foo);//0
```
等价于：
```javascript
var a = 0;
function bar(fn){
    fn();
}
bar(function foo(){
    console.log(this.a);
});
```

* 内置函数   
内置函数与上例类似，也会造成隐式丢失
```javascript
var a = 0;
setTimeout(function foo(){
    console.log(this.a);
},100);//0
```

* 间接引用   
函数的"间接引用"一般都在无意间创建，最容易在赋值时发生，会造成隐式丢失
```javascript
function foo() {
    console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
//将o.foo函数赋值给p.foo函数，然后立即执行。相当于仅仅是foo()函数的立即执行
(p.foo = o.foo)(); // 2
```
```javascript
function foo() {
    console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
//将o.foo函数赋值给p.foo函数，之后p.foo函数再执行，是属于p对象的foo函数的执行
p.foo = o.foo;
p.foo();//4
```

* 其他情况   
在javascript引擎内部，obj和obj.foo储存在两个内存地址，简称为M1和M2。只有obj.foo()这样调用时，是从M1调用M2，因此this指向obj。但是，下面三种情况，都是直接取出M2进行运算，然后就在全局环境执行运算结果（还是M2），因此this指向全局环境
```javascript
var a = 0;
var obj = {
    a : 2,
    foo:foo
};
function foo() {
    console.log( this.a );
};

(obj.foo = obj.foo)();//0

(false || obj.foo)();//0

(1, obj.foo)();//0
```


## 四、显示绑定
通过call()、apply()、bind()方法把对象绑定到this上，叫做显式绑定。
