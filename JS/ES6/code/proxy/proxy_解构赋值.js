const obj1 = {
  age: 28
}
const handler = {
  get: function (target, key) {
    // console.log('get--', key)
    return Reflect.get(...arguments)
  },
  set: function (target, key, value) {
    // console.log('set--', key, '=', value)
    return Reflect.set(...arguments)
  }
}
const data = new Proxy(obj1, handler)
// 这种方法是错误的，不能解构
let { age } = data
age++
console.log(age)
console.log(data)
// console.log(data.age, '错误data.age')
// 正确的方法是这样些的
console.log('\n\n')
data.age++
console.log(age)
console.log(data)
// console.log(data.age, '正确的data.age')