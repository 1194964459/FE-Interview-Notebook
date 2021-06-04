var foo = {
    value: 1
};

function bar(name, age) {
    console.log('val: ',this.value);
    console.log('name:', name);
    console.log('age:', age);
}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// val:  1
// name: daisy
// age: 18