let x, y

new Promise(() => {
    throw new Error();
}).catch((x) => {
    (x = 1), (y = 2);
})

console.log(x, y);  // undefined undefined