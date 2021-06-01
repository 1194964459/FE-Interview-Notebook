对于每个执行上下文，都有三个重要属性：
    变量对象(Variable object，VO)
    作用域链(Scope chain)
    this

## 一、执行上下文
任何变量（原始值/引用值）都存在于某个执行上下文中（也称为作用域）。上下文（作用域）决定了变量的生命周期，以及它们可以访问代码的哪些部分。

执行上下文可以总结如下:
1. 执行上下文分全局上下文、函数上下文和块级上下文。
2. 代码执行流每进入一个新上下文，都会创建一个'作用域链'，用于搜索变量和函数。
3. 变量的执行上下文用于确定什么时候释放内存。
4. 函数/块的局部上下文不仅可以访问自己作用域内的变量，也可访问‘全局作用域’的变量；反之，则不行..
5. 全局上下文是最外层的上下文。在浏览器中，全局上下文就是我们常说的 window 对象。

每个上下文都有一个关联的'变量对象（variable object）'，上下文中定义的所有变量和函数都存在于这个对象上。

<!-- 执行上下文是如何被管理？ 或者程序的执行流是如何被控制的？ -->
'ECMAScript 程序的执行流'就是通过这个'上下文栈'进行控制的。'当执行一个函数的时候，就会创建一个执行上下文'，并且压入'执行上下文栈'；在'函数执行完之后'，上下文栈会弹出该函数上下文，将控制权返还给之前的执行上下文。

上下文中的代码在执行的时候，会创建变量对象的一个'作用域链（scope chain）'。这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。

### 示例：
问：两段代码究竟有哪些不同呢？

```javascript
// 代码1：
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();

// 代码2：
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```
答：执行结果相同，但是执行上下文栈的变化不一样。
```javascript
// 代码1：
ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();

// 代码2：
ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();
```

## 二、变量对象
变量对象(也称作'活动对象'，activation object, AO)是与执行上下文相关的'数据作用域'，存储了在上下文中定义的'变量和函数'声明。

创建时机：进入'函数上下文'时被创建的。初始值只包含函数的 arguments 属性，即 Arguments 对象。在'进入执行上下文'时会给变量对象添加形参、函数声明、变量声明等初始的属性值。

函数声明：
1. 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
2. 如果变量对象已经存在相同名称的属性，则'完全替换'这个属性

变量声明：
1. 由名称和对应值（undefined）组成一个变量对象的属性被创建；
2. 如果变量名称跟已经声明的'形式参数或函数'相同，则变量声明'不会干扰'已经存在的这类属性;
3. 使用 var 声明变量时，变量会被自动添加到最接近的上下文。如果变量'未经声明就被初始化'了，
那么它就会自动被添加到全局上下文。

### 示例1：
```javascript
function foo() {
    console.log(a);
    a = 1;
}

foo(); // ???

function bar() {
    a = 1;
    console.log(a);
}
bar(); // ???
```

第一段会报错：Uncaught ReferenceError: a is not defined。
第二段会打印：1。
这是因为函数中的 "a" 并没有通过 var 关键字声明，所有不会被存放在 AO 中。

### 示例2：

```javascript
console.log(foo);

function foo(){
    console.log("foo");
}

var foo = 1;
```
会打印函数，而不是 undefined。
这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

## 三、作用域增强
执行上下文主要有'全局上下文和函数上下文'两种（eval()调用内部存在'第三种上下文'），但有
其他方式来'增强作用域链'。

某些语句会导致在作用域链前端'临时添加一个上下文'，这个上下文在代码执行后会被删除。通常在两种情况下会出现这个现象，即代码执行到下面任意一种情况时：
1. try/catch 语句的 catch 块 
2. with 语句
这两种情况下，都会在作用域链前端添加一个变量对象。

## 四、eval()



## 五、垃圾回收