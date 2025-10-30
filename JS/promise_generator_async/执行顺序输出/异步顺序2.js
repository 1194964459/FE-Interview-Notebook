async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

console.log('script start');

async function async2() {
    console.log('async2');
}
async1()
console.log('end')


// script start
// async1 start
// async2
// end
// async1 end


// async2 内部的 console.log('async2') 也是同步代码
// async2() 返回一个 Promise；将后续代码（console.log('async1 end')）包装成一个微任务