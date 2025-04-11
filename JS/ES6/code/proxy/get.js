// var obj = new Proxy({}, {
//   get: function (target, propKey, receiver) {
//     console.log(`getting ${propKey}!`);
//     return Reflect.get(target, propKey, receiver);
//   },
//   set: function (target, propKey, value, receiver) {
//     console.log(`setting ${propKey}!`);
//     return Reflect.set(target, propKey, value, receiver);
//   }
// });

// obj.count = 1
// //  setting count!
// ++obj.count
// //  getting count!
// //  setting count!
// //  2


/**
 * 如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同
 * 如果要访问的目标属性没有配置访问方法，即get方法是undefined的，则返回值必须为undefined
 */
const obj = {};
Object.defineProperty(obj, "a", {
  configurable: false,
  enumerable: false,
  value: 10,
  writable: false
})

const p = new Proxy(obj, {
  get: function (target, prop) {
    return 20;   // 若是10不报错；若是20报错
  }
})

console.log(p.a) // Uncaught TypeError: 'get' on proxy: property 'a' is a read-only and non-configurable..
