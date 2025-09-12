const data: any = { name: "Alice", age: 25 };

const user = data as { name: string };

console.log(user.name)  // OK，正确✅
console.log(user.age)   // 错误 ❌

/**
 * 通过 as { name: string } 断言后，TypeScript 会认为 user 的类型是 { name: string }。
 * 
 * 访问 user.name 是安全的（编译器认可该属性存在）
 * 访问 user.age，编译器会报错（因为断言的类型中没有 age）
 * 
 * 在这个例子中，虽然 data 有 age，但断言时 “忽略” 了它，后续代码就无法通过类型检查访问 age。
 * 
 * TSC语法主要做了两件事：语法转换、类型检查
 */