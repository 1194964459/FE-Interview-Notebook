const foo = {
    hasOwnProperty() {
        return false;
    },
    bar: "The dragons be out of office",
};

console.log(Object.hasOwn(foo, "bar"))  // true
console.log(foo.hasOwnProperty('bar'))   // false

console.log('----')

const f = Object.create(null);
// const f = {}
f.prop = "exists";
console.log(Object.hasOwn(f, "prop"))  // true
console.log(f.hasOwnProperty('prop'))  // 报错


