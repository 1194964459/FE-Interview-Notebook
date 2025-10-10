const someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
    });
};

someAsyncThing().then(function () {
    console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
//   Uncaught (in promise) ReferenceError: x is not defined
//   123