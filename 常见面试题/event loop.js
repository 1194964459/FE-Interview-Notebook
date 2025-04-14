/**
 * 事件循环相关
 */

// 题目1
// async function async1() {
//     console.log(1);
//     const result = await async2();
//     console.log(3);
// }

// async function async2() {
//     console.log(2);
// }

// Promise.resolve().then(() => {
//     console.log(4);
// });

// setTimeout(() => {
//     console.log(5);
// });

// async1();
// console.log(6);

// 1
// 2
// 6
// 4
// 3
// 5


// 题目2：
// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     console.log(2);
// });
// promise.then(() => {
//     console.log(3);
// });
// console.log(4);

// 1
// 2
// 4

// 题目3
// const promise = new Promise((resolve, reject) => {
//     console.log(1);

//     setTimeout(() => {
//         console.log("timerStart");
//         resolve("success");
//         console.log("timerEnd");
//     }, 0);

//     console.log(2);
// });
// promise.then((res) => {
//     console.log(res);
// });
// console.log(4);

// 1
// 2
// 4
// timerStart
// timerEnd
// success

// 题目4：
// const promise = new Promise((resolve, reject) => {
//     resolve('success1');
//     reject('error');
//     resolve('success2');
// });
// promise.then((res) => {
//     console.log('then:', res);
// }).catch((err) => {
//     console.log('catch:', err);
// })

// then: success1


// 题目5：
// async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
// }
// async function async2() {
//     console.log("async2");
// }
// async1();
// console.log('start')

// async1 start
// async2
// start
// async1 end


// 题目6：
// async function async1() {
//     console.log("async1 start");

//     await async2();

//     console.log("async1 end");

//     setTimeout(() => {
//         console.log('timer1')
//     }, 0)
// }
// async function async2() {
//     setTimeout(() => {
//         console.log('timer2')
//     }, 0)

//     console.log("async2");
// }
// async1();
// setTimeout(() => {
//     console.log('timer3')
// }, 0)
// console.log("start")

// async1 start
// async2
// start
// async1 end
// timer2
// timer3
// timer1

// 题目7
// async function async1() {
//     console.log('async1 start');
//     await new Promise(resolve => {
//         console.log('promise1')
//     })
//     console.log('async1 success');
//     return 'async1 end'
// }
// console.log('srcipt start')
// async1().then(res => console.log(res))
// console.log('srcipt end')

// srcipt start
// async1 start
// promise1
// srcipt end

// 题目8
// async function async1() {
//     console.log('async1 start');

//     await new Promise(resolve => {
//         console.log('promise1')
//         resolve('promise1 resolve')
//     }).then(res => console.log(res))

//     console.log('async1 success');

//     return 'async1 end'
// }
// console.log('srcipt start')
// async1().then(res => console.log(res))
// console.log('srcipt end')

// srcipt start
// async1 start
// promise1
// srcipt end
// promise1 resolve
// async1 success
// async1 end

// 题目9
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}

async function async2() {
    console.log("async2");
}

console.log("script start");

setTimeout(function () {
    console.log("setTimeout");
}, 0);

async1();

new Promise(resolve => {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});
console.log('script end')


// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
