// Object.prototype.toString.call
console.log('null: ', Object.prototype.toString.call(null))  // "[object Null]"
console.log('undefined: ', Object.prototype.toString.call(undefined))  // "[object Undefined]"
console.log('数值: ', Object.prototype.toString.call(123))   // "[object Number]"
console.log('字符串: ', Object.prototype.toString.call('str'))  // "[object String]"
console.log('布尔值: ', Object.prototype.toString.call(true))  //" [object Boolean]"
console.log('对象: ', Object.prototype.toString.call({}))  //" [object Object]"
console.log('数组: ', Object.prototype.toString.call([]))  //" [object Array]"


function type(obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, "");
}

function isArray(list) {
  return type(list) === "Array";
}

function isObject(obj) {
  return type(obj) === "Object";
}

function isString(str) {
  return type(str) === "String";
}

function isNotEmptyObj(obj) {
  return isObject(obj) && JSON.stringify(obj) != "{}";
}

function objForEach(obj, fn) {
  isNotEmptyObj(obj) && Object.keys(obj).forEach(fn);
}

function aryForEach(ary, fn) {
  ary.length && ary.forEach(fn);
}

console.log('对象：', type(9))