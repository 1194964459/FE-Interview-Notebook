var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';   // handler为空对象，访问proxy就等同于访问target。
// target.a // "b"
target.c = 'c'
console.log('target:', target)
console.log('proxy:', proxy)