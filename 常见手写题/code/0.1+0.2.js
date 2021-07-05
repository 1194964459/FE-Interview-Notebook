console.log(0.1 + 0.2 === 0.3) //false


// Number.EPSILON = (function () {     //解决兼容性问题
//     return Number.EPSILON ? Number.EPSILON : Math.pow(2, -52);
// })();

function numbersequal(a, b) {
    return Math.abs(a - b) < Number.EPSILON || Math.pow(2, -52);
}
var a = 0.1 + 0.2, b = 0.3;
console.log(numbersequal(a, b)); //true

