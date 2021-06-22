// index.js

// 首先引入对应的方法来创建虚拟DOM
import { createElement } from './virtual_dom_1';

let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['周杰伦']),
    createElement('li', {class: 'item'}, ['林俊杰']),
    createElement('li', {class: 'item'}, ['王力宏'])
]);

console.log(virtualDom);
