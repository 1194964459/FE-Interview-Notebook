let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    // console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // "GET foo"
console.log(obj.foo)   // undefined