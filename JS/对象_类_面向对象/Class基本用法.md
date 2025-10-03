# Class 基本方法

## 一、简介

### 1. 类的由来
* **ES5 实现一个类**

```JS
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

* **ES6 实现一个类**

```JS
class Point {  // class 是小写
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

ES6 的类，完全可以看作构造函数的另一种写法。

```js
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```
上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

**ES6 的类有如下特性**：
* 类的**方法**前面**不需要加上function**这个关键字，
* 方法与**方法之间不需要逗号分隔**，加了会报错。
* **ES6中类的方法**，都是**定义在类的prototype属性上， 且是不可枚举的（non-enumerable， 即用Object.keys查找不到）**；但是**ES5**，定义在类的prototype属性上的方法是**可枚举的**。
* 在类的实例上面调用方法，其实就是调用原型上的方法。

### 2. constructor 方法
* 类必须使用new调用，否则会报错。普通构造函数不用new也可以执行。
* 一个类必须有constructor()方法，**如果没有显式定义，一个空的constructor()方法会被默认添加**。
```JS
class Point {
}

// 等同于
class Point {
    constructor() {}
}
```
* 通过new命令生成对象实例时，自动调用该方法。
* constructor()方法默认返回实例对象（即this）, 不过也可以指定返回另外一个对象。
```JS
class Foo {
    constructor() {
        return Object.create(null);
    }
}

new Foo() instanceof Foo    // false
```

### 3. Clsss 表达式
与函数一样，类也可以使用表达式的形式定义。

```JS
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};
```
需注意的是：
* 类的名字是 Me，但是 Me 只在 Class 的内部可用，指代当前类。
* 在 Class 外部，这个类只能用 MyClass 引用。
* 若类的内部没有用到 Me, 可以省略Me。
```JS
const MyClass = class { /* ... */ };
```

### 4. 注意点：
* 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。
* 类 不存在变量提升，这一点与 ES5 完全不同。
```JS
new Foo(); // ReferenceError
class Foo {}
```
* name属性：返回紧跟在class关键字后面的类名。
```JS
class Point {}
Point.name // "Point"
```
* this 指向

类的方法内部如果含有this，它默认指向类的实例。但是，一旦单独使用该方法（不是通过类的实例 使用），this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined）。
```JS
class Logger {
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

## 二、静态方法

* 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
* 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
* 如果静态方法包含this关键字，这个this指的是类，而不是实例。
```js
class Foo {
    static bar() {
        this.baz();
    }
    static baz() {
        console.log('hello');
    }
    baz() {
        console.log('world');
    }
}

Foo.bar() // hello
```

* 父类的静态方法，可以被子类继承。

## 三、实例属性的新写法 

实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层（其他都不变）。

```JS
class IncreasingCounter {
    // 写法1：
    // constructor() {
    //     this._count = 0;
    // }

    // 写法2：
    _count = 0;

    get value() {
        console.log('Getting the current value!');
        return this._count;
    }
    increment() {
        this._count++;
    }
}
```

## 四、静态属性
静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。

```JS
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```
上面的写法为Foo类定义了一个静态属性prop。
