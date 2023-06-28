var p2 = new Promise(function (resolve, reject) {
  resolve(1);
});

p2.then(function (value) {
  console.log(value); // 1
  return value + 1;
}).then(function (value) {
  console.log(value + ' - A synchronous value works');
});

p2.then(function (value) {
  console.log(value); // 1
});


// 1
// 1
// 2 - A synchronous value works