console.log("Start"); // 1. 同步输出 Start

const promise = Promise.resolve(100); // 2. Promise.resolve() 同步执行，并创建一个已解决的 Promise

promise.then(value => {
    console.log(value);
});

setTimeout(() => {
    console.log("Timeout");
}, 0);

console.log("End"); // 3. 同步输出 End

// 输出：
// Start
// End
// 100
// Timeout