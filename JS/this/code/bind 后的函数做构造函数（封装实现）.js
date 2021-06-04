var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';

// 关键函数实现
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
       
        // 调用 bind 后创建的新函数绑定this：
        // 1. 若不用做构造函数：直接绑定 context
        // 2. 若用做构造函数时：this 指向实例，不应该绑定在 context上，直接绑定在实例上

        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }

    fBound.prototype = this.prototype;  //this为调用 bind 的函数
    return fBound;
}

var bindFoo = bar.bind2(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin