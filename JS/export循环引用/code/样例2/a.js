import { bar } from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export { foo };