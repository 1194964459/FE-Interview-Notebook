/**
 * 对象浅拷贝
 */

let obj = {
  id: 1,
  info: {
    name: "hello",
    age: 24
  }
}
// 实现浅拷贝
let obj2 = {};
for (let key in obj) {
  obj2[key] = obj[key];
}
obj2.id = 3;
obj2.info.age = 1
console.log(' 原对象id：', obj.id, '\n', '拷贝对象：', obj2.id);   // 3

console.log(' 原对象：', obj.info.age, '\n', '拷贝对象：', obj2.info.age);   // 3
