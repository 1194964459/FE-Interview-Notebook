TypeScript可以被认为是Javascript的优化版本，JS是门**动态语言，相对自由度高**前提下，TS主要是添加了**编译类型检查**。TS 适用于开发 多人协作、逻辑复杂的大型项目。

## 数组

TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：

```ts
let list: number[] = [1, 2, 3];
```
第二种方式是使用数组泛型，Array<元素类型>：

```ts
let list: Array<number> = [1, 2, 3];
```

## 类型断言
类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法，另一个为 as 语法：

```ts
let someValue: any = "this is a string";

// 尖括号
let strLength: number = (<string>someValue).length;

// as
let strLength: number = (someValue as string).length;
```

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
参考：[interface与type详解](./interface与type.md)