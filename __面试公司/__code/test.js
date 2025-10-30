// !!x 的结果等价于 Boolean(x)

// console.log(!!null)
// console.log(!!'')
// console.log(!!1)
// console.log(!!NaN)

// 两个var
// var a = 1
// console.log(a)
// var a = 2
// console.log(a)


// let a = 3;
// let b = new Number(3)
// let c = 3;
// console.log(a === b, a == b) // false true
// console.log(typeof b)   // object


// for (var i = 0; i < 5; i++) {
//     setTimeout(() => console.log(i), 0);
// }
// console.log('--------')
// for (var i = 0; i < 5; i++) {
//     setTimeout(console.log(i), 0);
// }
// console.log('--------')

// for (let i = 0; i < 5; i++) {
//     setTimeout(() => console.log(i), 0);
// }

let x, y

new Promise(() => {
    throw new Error();
}).catch((x) => {
    (x = 1), (y = 2);
})

console.log(x, y);   // undefined undefined