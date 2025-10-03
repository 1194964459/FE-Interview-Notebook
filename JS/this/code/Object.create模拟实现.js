
// 实现Object.create方法
function create(o) {
    function F() { };
    F.prototype = o;
    // F.prototype.constructor = F;  // 这一行代码不需要加
    return new F();
}
let demo = {
    c: '123'
}
let cc = Object.create(demo)

console.log(cc.c)