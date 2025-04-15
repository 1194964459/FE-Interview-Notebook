// main.js
const a = require('./a').a;
 
console.log(a);  // 1
 
setTimeout(() => {
    const b = require('./a').a;
    console.log(b);  // 1
}, 100);