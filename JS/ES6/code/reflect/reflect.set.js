let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    // Reflect.set(target, key, value, receiver) // Reflect.set传入receiver，会出发Proxy的defineProperty拦截。
    Reflect.set(target, key, value)  // Reflect.set没有传入receiver，那么就不会触发proxy的defineProperty拦截。


  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
console.log('p.a为:', p.a, '\n\nobj.a为:', obj.a)   // p.a为: A,  obj.a为: A
// set
// defineProperty