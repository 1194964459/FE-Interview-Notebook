console.log("cat".match(/\bcat\b/g));  // [ 'cat' ]
console.log("cat.".match(/\bcat\b/g));  // [ 'cat' ]
console.log("category".match(/\bcat\b/g));  // null

console.log('123abc'.replace(/\b/g, '|'))  // |123abc|
console.log('num=123'.replace(/\b/g, '|'))  // |num|=|123|
