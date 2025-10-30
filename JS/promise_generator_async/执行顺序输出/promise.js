console.log(1);

new Promise((resolve, reject) => {
    console.log(2);
    resolve()
})
    .then(() => {

        console.log(3);

        setTimeout(() => {

            console.log(4);

        }, 0)

    }).then(() => {
        console.log(8)
    })


setTimeout(() => {
    console.log(5);

    setTimeout(() => {
        console.log(6);
    }, 0)

}, 0)

console.log(7);


// 1
// 2
// 7
// 3
// 8
// 5
// 4
// 6