# Class 继承
**目录**：
* 简介
* Object.getPrototypeOf()
* super 关键字
* 类的 prototype 属性和__proto__属性
* 原生构造函数的继承


## 一、简介

Class 通过 extends 关键字实现继承，相比 ES5 通过修改原型链实现继承，要清晰和方便很多。
```JS
class Point {
}

class ColorPoint extends Point {
}
```

**1. 子类必须在 constructor 方法中调用 super方法，否则新建实例时会报错**。
* 子类自己的this对象，必须先通过父类的构造函数完成塑造，否则子类就得不到this对象。

```js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        this.color = color; // ReferenceError
        super(x, y);
        this.color = color; // 正确
    }
}
```
* ES6继承 与 ES5继承 是不一样的：

（1）ES5继承实质上是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。

（2）ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

**2. 任何一个子类都有constructor方法。若没有显示定义，该方法也会被默认添加**。
```JS
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
    constructor(...args) {
        super(...args);
    }
}
```
**3. 父类的静态方法，可以被子类继承**。

## 二、Object.getPrototypeOf()

Object.getPrototypeOf方法可以用来从子类上获取父类。

```JS
Object.getPrototypeOf(ColorPoint) === Point
// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类。

## 三、super 关键字

super这个关键字，既可以当作函数使用，也可以当作对象使用。

**1. super作为函数调用时，代表父类的构造函数**
* ES6 要求，子类的构造函数必须执行一次super函数。
* super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的 this 指的是 B的实例。相当于：

```JS
super()
// 等同于
A.prototype.constructor.call(this)
```

* 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
```JS
class A {}

class B extends A {
    m() {
        super(); // 报错
    }
}
```

**2. super作为对象时**：
* 在**普通方法**中，super 指向**父类的原型对象**，所以**定义在父类实例上的方法或属性，是无法通过super调用的。**
* 在**静态方法**中，super 指向**父类**。另外，在子类的静态方法中通过super调用父类的方法时，**方法内部的this指向当前的 子类，而不是子类的实例**。

```js
class A {
    constructor(){
        this.m = 2  // 父类 实例属性
    }
    p() {  // 父类 原型属性
        return 2;
    }
}

class B extends A {
    constructor() {
        super();
        console.log( super.p() ); // 2
        console.log( super.m )  // undefined
    }
}

let b = new B();
```
* **通过super对某个属性赋值**，这时super就是this，赋值的属性会变成子类实例的属性。**通过super获取某个属性值**时，super指向父类的原型对象，同上面讲的一样。

```JS
class A {
    constructor() {
        this.x = 1;
    }
}

class B extends A {
    constructor() {
        super();
        this.x = 2;
        super.x = 3;  
        console.log(super.x); // undefined
        console.log(this.x); // 3
    }
}

let b = new B();
```
super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

* **注意：使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错**。
```JS
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super); // 报错

    console.log(super.valueOf() instanceof B); // true
  }
}
```
super.valueOf()表明super是一个对象，因此就不会报错。同时，由于super使得this指向B的实例，所以super.valueOf()返回的是一个B的实例。

## 四、类的 prototype 属性和__proto__属性 

ES5 中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

（1）作为一个对象，子类的__proto__属性，总是指向父类。

（2）作为一个构造函数，子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

```JS
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

**但是为什么会有这一结论呢**？
```JS
// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

// Object.setPrototypeOf 方法的实现
Object.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
}

// Object.create 
B.prototype = Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
```

下面，**讨论两种情况：子类继承Object类；不存在任何继承**。
```JS
// 第一种情况
class A extends Object { }
A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true


// 第二种情况
class A { }
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

### 实例的 __proto__ 属性
子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。

```JS
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true

// 可以参考：
// ColorPoint.prototype.__proto__ = Point.prototype;
```

## 五、原生构造函数的继承
ECMAScript 的原生构造函数大致有下面这些。

* Boolean()
* Number()
* String()
* Array()
* Date()
* Function()
* RegExp()
* Error()
* Object()

**以前，这些原生构造函数是无法继承的**。因为**子类 无法获得 原生构造函数的内部属性，通过Array.apply()或者分配给原型对象Object.create()都不行**（ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上）。比如，不能自己定义一个Array的子类。

```JS
function MyArray() {
    Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
    }
});

var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"
```

**ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承**。

```JS
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```

上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。

## 六、ES6中Class继承 与 ES5继承 比较
* Class 通过extends关键字实现继承，相比 ES5 修改原型链实现继承，要清晰和方便很多。

* ES5 和 ES6 继承机制不同：

（1）ES5继承实质上是**先创造 子类的实例对象this**，然后**再将父类的方法添加到this上面**（Parent.apply(this)）。

（2）ES6 的继承机制完全不同，实质是**先将父类实例对象的属性和方法，加到this上面**（所以必须先调用super方法），然后**再用子类的构造函数修改this**。

（3）鉴于两者实现机制的不同，对于原生构造函数的继承（Array，String，Function，Date，Error...），两者的表现也是不一样的。ES5 中原生构造函数是无法继承的，ES6 则允许继承原生构造函数定义子类。