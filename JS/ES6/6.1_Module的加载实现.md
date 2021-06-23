# Module 的加载实现
ES6 Module 可以看：[Module](./Module.md)

* 浏览器加载
* ES6 模块与 CommonJS 模块的差异
* Node.js 的模块加载方法
* 循环加载


## 一、浏览器加载
### 传统方法

```html
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
  // module code
</script>

<!-- 外部脚本 -->
<script type="application/javascript" src="path/to/myModule.js">
</script>
```

默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到<script></script>标签就会停下来，等到执行完脚本，再继续向下渲染。如果是**外部脚本**，还必须**加入 脚本下载的时间**。

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞。所以浏览器允许**脚本异步加载**。
```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```
渲染引擎**遇到这一行命令，就会开始下载外部脚本**，但**不会等它下载和执行，而是直接执行后面的命令**。

**defer与async的区别是**：
* defer是“渲染完再执行”；
* async是“下载完就执行”；
* 如果有多个**defer脚本**，会**按照它们在页面出现的顺序加载**，而**多个async脚本**是**不能保证加载顺序**的。

### 加载规则
* 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
```html
<script type="module" src="./foo.js"></script>
```

* 浏览器对于带有type="module"的<script></script>，**等同于**脚本带上 defer 属性，都是渲染完之后再执行。
```html
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

* type="module"的<script></script>，**也可以加入async属性**，这时脚本表现同单加 async 属性一样（会忽略type='module', defer）
```html
<script type="module" src="./foo.js" async></script>
```

* ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
```HTML
<script type="module">
    import utils from "./utils.js";

    // other code
</script>
```
* 外部的模块脚本（上例是foo.js），有几点需要注意：

    (1) **代码是在模块作用域之中运行**，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。

    (2) 模块之中，可以使用import命令加载其他模块，也可以使用export命令输出对外接口。

    (3) 同一个模块如果加载多次，将只执行一次。

    (4) **模块之中，顶层的this关键字返回undefined**，而不是指向window。

    (5) 模块脚本**自动采用严格模式**，不管有没有声明use strict。


```js
import utils from 'https://example.com/js/utils.js';

const x = 1;

console.log(x === window.x); //false
console.log(this === undefined); // true
```

* 利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中。

```js
const isNotModuleScript = this !== undefined;
```

## 二、ES6 模块与 CommonJS 模块的差异
**ES6 模块与 CommonJS 模块 差异如下**：
* CommonJS 模块输出的是一个值的拷贝（会被缓存），ES6 模块输出的是值的引用。
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
* CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

**第二个差异**：
* CommonJS **加载的是一个对象（即module.exports属性）**，该对象**只有在脚本运行完才会生成**。
* ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

**第一个差异**：
* CommonJS 模块输出的是值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
```js
// lib.js
var counter = 3;
function incCounter() {
    counter++;
}
module.exports = {
    counter: counter,
    incCounter: incCounter
};
```

```js
// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```
mod.counter是一个原始类型的值，外部导入的只是该值的一个副本。若想在外部得到内部变动后的值，除非写成一个函数。
```JS
module.exports = {
    get counter() {
        return counter
    },
    incCounter: incCounter,
};
```

* ES6 模块输出的是值的引用（只读）。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。原始值变了，import加载的值也会跟着变。
```js
// lib.js
export let counter = 3;
export function incCounter() {
    counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

ES6 输入的模块变量，只是一个“符号连接”(只读变量)，对它进行重新赋值会报错。
```js
// lib.js
export let obj = {};

// main.js
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```

## 三、Node.js 的模块加载方法
**1. Node 应用由模块组成，采用 CommonJS 模块规范**。

* 每个模块内部，都有一个module对象，代表当前模块。它有以下属性：
    > * module.id       模块的识别符，通常是带有绝对路径的模块文件名。
    > * module.filename 模块的文件名，带有绝对路径。
    > * module.loaded   返回一个布尔值，表示模块是否已经完成加载。
    > * module.parent   返回一个对象，表示调用该模块的模块。
    > * module.children 返回一个数组，表示该模块要用到的其他模块。
    > * module.exports  表示模块对外输出的值。

* 它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
* 为了方便，Node为每个模块提供一个**exports变量，指向module.exports**。这等同在每个模块头部，有一行这样的命令。在对外输出模块接口时，可以向exports对象添加方法。
```JS
var exports = module.exports;
```
```js
// 通过 exports 对外 输出模块接口
exports.area = function (r) {
    return Math.PI * r * r;
};

// 不得擅自更改 exports 指向，否则会切断exports与module.exports的联系，导致不能输出变量。
exports = function(x) {console.log(x)};
```
若觉得，exports与module.exports之间的区别很难分清，可以直接放弃使用exports，只使用module.exports。

**2. 从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持**。

CommonJS 模块使用require()和module.exports。ES6 模块使用import和export。

* .mjs 文件（module）总是以 ES6 模块加载；
* .cjs 文件（commonJs）总是以 CommonJS 模块加载；
* .js 文件的加载取决于项目 package.json 里面 type 字段的设置（该字段默认为 CommonJS 模块）。
```js
{
    "type": "module"  // .js脚本会被解释成 es6 模块
    "type": "commonjs"  // .js脚本会被解释成 CommonJS 模块
}
```
ES6 模块与 CommonJS 模块尽量不要混用。

**3. 内部变量**：
ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。但是，要想达到这个目的，ES6 模块之中不能使用 CommonJS 模块的一些 特有的 内部变量。

* this关键字：ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块。这也是两者的一个重大差异
* arguments
* require
* module
* exports
* __filename
* __dirname


## 四、循环加载

### commonJS 的 循环加载

**CommonJS 模块的加载原理**
require命令**第一次加载该脚本，就会执行整个脚本**，然后在内存生成一个对象。即使**再次执行require命令**，也不会再次执行该模块，而是**到缓存之中取值**。
```JS
{
    id: '...',         // 模块名
    exports: { ... },  // 模块输出的各个接口
    loaded: true,      // 布尔值，表示该模块的脚本是否执行完毕。
    ...
}
```

略...

### ES 的 循环加载
略...
