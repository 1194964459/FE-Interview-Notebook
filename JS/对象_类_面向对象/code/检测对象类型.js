let s = Symbol();
console.log('Symbol 1: ', typeof s)    //"symbol"
console.log('Symbol 2: ', s instanceof Symbol)  //false


console.log('字符串：', 'abc' instanceof String)
console.log('字符串对象：', (new String()) instanceof String)


// instanceof 1
var o = { 
    'name':'lee'
};
var a = ['reg','blue'];

console.log('================')
console.log(o instanceof Object);// true
console.log(a instanceof Array);//  true
console.log(a instanceof Object);//  false
console.log('================')

// instanceOf 2

function C(){}

var o = new C();
console.log('o instanceof C:', o instanceof C)
// 改变构造函数的prototype
C.prototype = {};

var o2 = new C();

console.log('o2 instanceof C:', o2 instanceof C)
console.log('o instanceof C:', o instanceof C)


// 继承
function Person(){ }
function Student(){ }

Student.prototype = new Person();

var John = new Student();
console.log('继承 John.constructor == Student： ', John.constructor == Student); // false
console.log('继承 John.constructor == Person： ', John.constructor == Person); // true

// Object.prototype.toString.call
console.log('null: ', Object.prototype.toString.call(null))  // "[object Null]"
console.log('undefined: ', Object.prototype.toString.call(undefined))  // "[object Undefined]"
console.log('数值: ', Object.prototype.toString.call(123))   // "[object Number]"
console.log('字符串: ', Object.prototype.toString.call('str'))  // "[object String]"
console.log('布尔值: ', Object.prototype.toString.call(true))  //" [object Boolean]"
console.log('对象: ', Object.prototype.toString.call({}))  //" [object Object]"
console.log('数组: ', Object.prototype.toString.call([]))  //" [object Array]"



function type(obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s/g, "");
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
