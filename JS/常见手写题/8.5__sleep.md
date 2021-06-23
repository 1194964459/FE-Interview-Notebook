# sleep 实现

```js
function sleep(fn, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fn);
        }, time);
    });
}
let saySomething = (name) => console.log(`hello,${name}`)

async function autoPlay() {
    let demo = await sleep(saySomething('TianTian'),1000)
    let demo2 = await sleep(saySomething('李磊'),1000)
    let demo3 = await sleep(saySomething('掘金的好友们'),1000)
}
autoPlay()

````