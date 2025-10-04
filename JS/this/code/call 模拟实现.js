// 第二版
Function.prototype.call2 = function (context) {
    context.fn = this;
    // 法1：这里用call不合适，因为就是为了模拟实现call的！
    // let args = Array.prototype.slice.call(arguments, 1)
    // context.fn(...args)  // 没问题

    // 法2：
    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');   // args为：['arguments[1]', 'arguments[2]']
    }
    console.log(args, '\n\n',)

    eval('context.fn(' + args + ')');  // 数组前加''，相当于调用arr.toString() 或 调用arr.json(',')

    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18);
// kevin
// 18
// 1