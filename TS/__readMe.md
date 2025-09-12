TypeScript可以被认为是Javascript的优化版本，JS是门**动态语言，相对自由度高**。在此前提下，TS主要是添加了**编译类型检查**。TS 适用于开发 多人协作、逻辑复杂的大型项目。

## 数组

TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组：      

第一种，可以在元素**类型后面接上 []**，表示由此类型元素组成的一个数组：

```ts
let list: number[] = [1, 2, 3];
```
第二种方式是使用数组泛型，Array<元素类型>：

```ts
let list: Array<number> = [1, 2, 3];
```

泛型中使用数组，应该如何表示呢？当然也是类型后接上 [] 了，只不过这里的类型 是类型变量 T
```TS
// 泛型函数：返回数组第一个元素（类型与数组元素一致）
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
```
## 泛型
参考：[泛型详解](./3.0__泛型.md)

## 类型断言
强行指定类型，解决编译器类型推断不足的问题！但是破坏类型安全（如果断言错误，运行时可能出问题）

类似于其它语言里的**类型转换**，**只是在编译阶段起作用**。

类型断言有两种形式。 其一是“尖括号”语法：```<类型>值```，另一个为as语法：```值 as 类型```：

```ts
let someValue: any = "this is a string";

// 尖括号
let strLength: number = (<string>someValue).length;

// as
let strLength: number = (someValue as string).length;
```
注：对一个有很多属性的对象 部分断言时，若访问没被断言的属性时，无法通过类型检查访问。参考：[类型断言](./code/断言.ts)


### 疑问❓：类型断言 与 泛型 的区别是？两者貌似都有<>的语法...
* 类型断言：
    * **强行指定类型**，让编译器接受开发者对类型的判断（跳过部分类型检查）。但是它会破坏类型安全（如果断言错误，运行时可能出问题），主要在**编译阶段**起作用。主要**解决类型推断问题**。
    * 格式：```<string>```

* 泛型：
    * 正如它的名字一样，是宽泛的类型，主要是 **定义通用类型结构**，让 函数、类、接口 在**使用时**动态适配多种类型（保持类型安全）。主要**解决代码复用问题**。
    * 格式：```<T>```


## 接口（interface）
在TypeScript里，接口的作用就是为这些**类型命名**和为你的代码或第三方**为代码定义契约**。
```js
interface SquareConfig {
    // 可选属性
    color?: string; 

    // 只读属性
    readonly x: number;

    // 字符串索引签名，可使额外属性绕开检查
    [propName: string]: any;

    // 接口描述函数类型，只有参数列表和返回值类型的函数定义。
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
}
```

**readonly vs const**
最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。

## type 和 interface
参考：[interface与type详解](./1.1__interface中定义函数.md)


## 类型声明文件
参考：[.d.ts类型声明文件 详细介绍](./4.0__.d.ts类型声明文件.md)