let a = { a: 10 };
let b = { b: 10 };
let obj = {
    a: 10
};

console.log('b: ', obj)

obj[b] = 20;

console.log('b: ', obj)    // { a: 10, '[object Object]': 20 }
console.log(obj[a]);

