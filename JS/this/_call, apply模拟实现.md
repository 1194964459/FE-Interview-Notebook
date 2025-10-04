# call, apply 模拟实现
参考：https://github.com/mqyqingfeng/Blog/issues/11

## 一、Call 模拟实现
首先，看下call, apply 实现了哪些功能：

```JS
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```

注意两点：
* call 改变了 this 的指向，指向到 foo
* bar 函数执行了

### 模拟实现第一步

试想当调用 call 的时候，把 foo 对象改造成如下：
```JS
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value)
    }
};

foo.bar(); // 1
```
这个时候 this 就指向了 foo，是不是很简单呢？

但是这样却给 foo 对象本身添加了一个属性，这可不行呐！

不过也不用担心，我们用 delete 再删除它不就好了~

**所以我们模拟的步骤可以分为：**
* 将函数设为对象的属性
* 执行该函数
* 删除该函数

以上个例子为例，就是：

```js
// 第一步
foo.fn = bar
// 第二步
foo.fn()
// 第三步
delete foo.fn
```

依据这个思路，我们初步实现第一版：
```JS
// 第一版
Function.prototype.call2 = function(context) {
    // 首先要获取调用call的函数，用this可以获取。this指向“call的调用者”，call的调用者是个函数！
    context.fn = this;
    context.fn();
    delete context.fn;
}
```

测试一下效果：
```js
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // 1
```

### 模拟实现第二步（考虑参数）

```JS
// 第二版
Function.prototype.call2 = function(context) {
    context.fn = this;

    // 获取参数的两个方法 
    // 法1：
    // 这里用call不合适，因为就是为了模拟实现call的！
    // let args = Array.prototype.slice.call(arguments, 1)
    // context.fn(...args)  

    // 法2：
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');   // args为：['arguments[1]', 'arguments[2]']
    }
    eval('context.fn(' + args +')');  //  // 数组前加''，相当于调用arr.json(',')

    delete context.fn;
}
```

### 模拟实现第三步（细节完善）
* this 参数可以传 null、undefined，此时，this指向 window;
```js
bar.call(null); 
```

* 函数是可以有返回值的

```JS
// 第三版
Function.prototype.call2 = function (context) {
    var context = context || window;  // context为null、undefined
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');  

    delete context.fn
    return result;  // 返回值
}
```

## 二、apply 模拟实现
apply 的实现跟 call 类似

```JS
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```
