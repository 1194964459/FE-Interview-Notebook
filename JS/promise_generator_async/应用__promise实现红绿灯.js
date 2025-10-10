/**
基于Promise实现红绿灯交替重复亮：
    红灯亮 3 秒
    黄灯亮 1 秒
    绿灯亮 3 秒
*/

function red() {
    console.log('red');
}

function yellow() {
    console.log('yellow');
}
function green() {
    console.log('green');
}

function lightOn(fn, time) {
    return new Promise((resolve, reject) => {
        fn()
        setTimeout(resolve, time)  // TODO:需要加()来调用吗？
    })
}

/**
 * 红绿灯循环
 */
async function trafficLightCycle() {
    while (true) {
        await lightOn(red, 3000);
        await lightOn(yellow, 1000);
        await lightOn(green, 3000);
    }
}

trafficLightCycle()
