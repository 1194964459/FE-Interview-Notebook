// 数组的 map 方法实现
Array.prototype.map = function(fn){
    let arr = [];
    for(let i = 0; i < this.length; i++) {
        arr.push(fn(this[i], i, this));
    }
    return arr;
}


// 实现
let array = [1, 2, 3].map((item) => {
    return item * 2;
});
  
console.log('lala: ', array);  // [2, 4, 6]

