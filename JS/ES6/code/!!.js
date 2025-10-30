console.log(!!0);
console.log(!!1);
console.log(!!'');
console.log(!!'hello');  // true（非空字符串是 truthy 值）
console.log(!!null);     // false
console.log(!!undefined);// false
console.log(!!NaN);      // false
