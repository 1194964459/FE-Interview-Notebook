/**
 * 场景1：
 */
// var name = '小王', age = 17
// var obj = {
//   name: '小张',
//   objAge: this.age,
//   myFun: function () {
//     console.log(this.name + '年龄' + this.age)
//   }
// }

// console.log(obj.objAge);  // undefined
// obj.myFun()  // 小张年龄 undefined

// ============================================
// ============================================

/**
 * 场景2：
 */
var a = "windowA";
var b = "windowB";
var str = "str";
var myObject = { a: "myA", b: "myB" };
function hello(s) {
  console.log(this)
  console.log("a= " + this.a + ", b= " + this.b + " " + s);
}
hello.call(null, str);
console.log('*********')
hello.call(myObject, str);

// TODO:浏览器环境下:
//a ="windowA" b = "windowB" str
//a="myA" b="myB" str

// TODO:node环境下
// a = undefined, b = undefined str
// a = myA, b = myB str