const a = {};
const b = { a: 1 };
const c = { b: 2 };
a[b] = 123;
a[c] = 456;
console.log(a, '\n\n', b, '\n\n', c)
// console.log(a[b]);  // 456


// { '[object Object]': 456 } 

//  { a: 1 } 

//  { b: 2 }