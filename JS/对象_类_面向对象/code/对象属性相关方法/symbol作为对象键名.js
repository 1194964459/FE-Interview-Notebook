// Symbol作为对象键名
const mySymbol = Symbol('描述符');
const obj1 = {
    name: 'Example',
    [mySymbol]: 'Symbol 值'
};
const obj2 = {};
obj2[mySymbol] = 'Symbol 值';
console.log(obj1[mySymbol]); // 输出: Symbol 值
console.log(obj2[mySymbol]); // 输出: Symbol 值

console.log(obj1.hasOwnProperty(mySymbol))   // true
console.log(Object.hasOwn(obj1, mySymbol))   // true

console.log(obj2.hasOwnProperty(mySymbol))   // true
console.log(Object.hasOwn(obj2, mySymbol))   // true