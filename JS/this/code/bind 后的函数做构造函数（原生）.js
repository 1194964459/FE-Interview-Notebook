var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log('val: ', this.value);
    console.log('name: ', name);
    console.log('age:', age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// val:  undefined
// name:  daisy
// age: 18

console.log('obj: ', obj)
console.log('obj.habit: ', obj.habit);
console.log('obj.friend: ', obj.friend);
// obj.habit:  shopping
// obj.friend:  kevin