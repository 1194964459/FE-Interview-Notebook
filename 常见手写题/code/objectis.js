console.log(Object.is(+0, 0))  // true
console.log(Object.is(-0, 0))  // false
console.log(Object.is(-0, -0))  // true
console.log(Object.is(+0, -0))  // false


console.log(Object.is(NaN, NaN))

console.log('===判断如下:')
console.log(+0 === 0) // true
console.log(-0 === 0) // true
console.log(+0 === -0) // true 

console.log(null === null)  // true
console.log(undefined === undefined); // true
console.log([] === []) // false

// 对应引用相同时，===判断则为true
const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true


const obj = new String("0");
console.log(typeof obj) // object

// null 与 null、undefined宽松相等，与其他的不相等
console.log('null == undefined：', null == undefined)   // true
console.log('null == ""：', null == '')  // false
console.log('undefined == ""：', undefined == '')  // false

console.log(Infinity === Infinity)  // true
console.log(-Infinity === -Infinity)  // true
