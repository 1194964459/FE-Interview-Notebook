let sum = (a,b,c) => a+b+c

function curry(fn){
    return function curried(...args){
        
        if(args.length >= fn.length){
            return fn.apply(this, args)
        }
        return function(...args2){
            return curried.apply(this, args.concat(args2))
        }
    }
}
let func = curry(sum)
let res1 = func(1)(2)(3)
let res2 = func(1,2,3)

console.log('res1: ', res1)
console.log('res2: ', res2)