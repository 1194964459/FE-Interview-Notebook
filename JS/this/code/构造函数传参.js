function foo(name){
    return name
}
// 1. 返回值为非引用类型
var a = new foo('字符串')
console.log(a)                // foo{}
console.log(typeof a)         // 'object'
console.log(a.__proto__ == foo.prototype)  // true

// 2. 返回值为引用类型
console.log('=====================')

var c = new foo(new String('字符串'))
console.log(c)                // [String: '字符串']
console.log(typeof c)         // 'object'
console.log(c.__proto__ == foo.prototype)  // false
console.log( '字符串' === new function(){ return new String('字符串') } )  // true  



console.log('=====================')

var b = new foo({name:'对象'})
console.log(b)                // {name:'对象'}
console.log(typeof b)         // 'object'
console.log(b.__proto__ == foo.prototype)  // false

console.log('=====================')

// 经典面试题
console.log( 'foo' == new function(){ return String('foo') } )      // false
console.log( 'foo' == new function(){ return new String('foo') } )  // true  
