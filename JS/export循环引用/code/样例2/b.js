import { foo } from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export { bar };