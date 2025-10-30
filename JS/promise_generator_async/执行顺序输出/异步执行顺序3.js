Promise.resolve().then(() => {
    console.log('then11');
    new Promise(resolve => {
        resolve();
    }).then(() => {
        console.log('then21');
    }).then(() => {
        console.log('then22');
    })
}).then(() => {
    console.log('then12');
})

// then11
// then21
// then12
// then22