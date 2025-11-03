for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 0);
}

// TODO:这道题有问题
for (var i = 0; i < 5; i++) {
    setTimeout(console.log(i), 0);
}

for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 0);
}