function curry(func){
  return function curried(...args){
    if(args.length >= func.length){
      return func.apply(this, args)
    }

    return function(...args2){
      return curried.apply(this, args.concat(args2))
    }
  }
}


// 测试
function sum (a, b, c) {
  return a + b + c
}
const curriedSum = curry(sum)
console.log(curriedSum(1, 2, 3))
console.log(curriedSum(1)(2,3))
console.log(curriedSum(1)(2)(3))