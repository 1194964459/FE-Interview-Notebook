# new 的模拟实现
参考：https://github.com/mqyqingfeng/Blog/issues/13


* new 创建了一个用户定义的对象类型的实例 或 具有构造函数的内置对象类型之一。

## new 实现的功能
在模拟 new 之前，先看看 new 实现了哪些功能。具体可见[构造函数 的具体执行流程](./构造函数%20普通函数%20区别.md)

```JS
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```

new 构造函数主要执行的操作有：
* 在堆内存中创建一个新的对象
* 该新对象内部的[[Prototype]]指针被赋值为构造函数的 prototype 属性
* 将构造函数内的this 被赋值为 这个新对象
* 逐个执行函数中的代码（给新对象添加属性等）
* 如果构造函数返回**非空对象（是对象类型，且非空）**，则返回该对象；否则，将新建的对象作为返回值

## 模拟实现 new 操作符
因为 new 是关键字，所以无法像 bind 函数一样直接覆盖，所以我们写一个函数，命名为 objectFactory，来模拟 new 的效果。用的时候是这样的：

```JS
function Otaku () {
    ……
}

// 使用 new
var person = new Otaku(……);

// 使用 objectFactory，模拟new
var person = objectFactory(Otaku, ……)
```

### 1. 初步实现
分析：
* new 的结果是一个新对象，因此在模拟实现时，需要建立一个新对象 obj；
* obj 会具有 Otaku 构造函数里的属性，想想经典继承的例子，我们可以使用 Otaku.apply(obj, arguments)来给 obj 添加新的属性。


```JS
// 第一版代码
function objectFactory(Otaku, ...) {

    var obj = new Object(),   // 创建新对象

    Constructor = [].shift.call(arguments); // arguments是类数组，需借用数组的shift方法；取出第一个参数（即：构造函数），另外此时arguments变量中的参数也少了一个

    obj.__proto__ = Constructor.prototype;  // 将新对象内部的 _proto_ 指针指向构造函数的prototype

    Constructor.apply(obj, arguments); // 构造函数绑定 新对象作为this，及参数

    return obj;  // 返回新对象
};
```
将上述代码复制到浏览器中运行，验证没问题，撒花！

### 2. 返回值效果实现
参考：[造函数的返回值](./构造函数的返回值.md)

构造函数在返回时，会判断返回值是否是对象：
* 若返回值是**非空对象（是对象类型，且非空）**，函数也是种特殊的对象，则将构造函数返回值 返回即可；
* 否则（没有返回值，或返回值是 原始值 或 空对象null），将新建的对象作为返回值。

考虑返回值的情况：

```JS
// 第二版的代码
function objectFactory(Otaku, ...) {

    var obj = new Object(),

    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);  // 获取构造函数的返回值

    // return typeof ret === 'object' ? ret : obj;  // 依据返回值类型，分别返回
    return (ret !== null && (typeof ret === 'object' || typeof ret === 'function')) ? ret : obj;
};
```

