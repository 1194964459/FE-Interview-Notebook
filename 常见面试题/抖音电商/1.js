const arr = [1,2,3]
arr.push(4);

// arr.splice(1,0);  // [ 1, 2, 3, 4 ]
arr.splice(1) // [1]
console.log(arr)

arr[1] = 3;
console.log(arr)

// 不允许
// arr = [1,2,3];
// console.log(arr)

// arr = [2,3];
// console.log(arr)
