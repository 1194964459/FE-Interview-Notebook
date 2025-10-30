async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

console.log('script start');

async function async2() {
    console.log('async2');
}

async1();

setTimeout(function () {
    console.log('setTimeout');
});

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});

setImmediate(function () {
    console.log('setImmediate');
});

process.nextTick(function () {
    console.log('nextTick');
});

console.log('script end');


// script start
// async1 start
// async2
// promise1
// script end
// nextTick   是微任务中的最高优先级
// async1 end
// promise2
// setTimeout
// setImmediate