// 数组的 reduce 方法实现

Array.prototype.reduce = function(fn, initialValue) {
    let acc = initialValue || this[0]
    const startIndex = initialValue ? 0 : 1
    
    for (let i = startIndex; i < this.length; i++) {
        acc = fn(acc, this[i], i, this)
    }
    return acc
}

let total = [1, 2, 3].reduce((prev, next, currentIndex, array) => {
    return prev + next;
}, 2);

console.log(total); // 6