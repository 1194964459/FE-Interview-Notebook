const str = "apple, banana, apple";

console.log(str.match(/(\w+)/));

const reg = /(\w+)/g;


/**
apple
banana
apple
 */
const matches = str.match(reg);
console.log(matches)
for (const match of matches) {
    console.log(match, typeof match);
}


const matches2 = str.matchAll(reg);
for (const match of matches2) {
    console.log(match);
}
/**
[
  'apple',
  'apple',
  index: 0,
  input: 'apple, banana, apple',
  groups: undefined
]
[
  'banana',
  'banana',
  index: 7,
  input: 'apple, banana, apple',
  groups: undefined
]
[
  'apple',
  'apple',
  index: 15,
  input: 'apple, banana, apple',
  groups: undefined
]
 */