import { deepClone } from "./deepClone.js";


const a = {
  i: Infinity,
  s: "",
  bool: false,
  n: null,
  u: undefined,
  sym: Symbol(),
  obj: {
    i: Infinity,
    s: "",
    bool: false,
    n: null,
    u: undefined,
    sym: Symbol(),
  },
  array: [
    {
      nan: NaN,
      i: Infinity,
      s: "",
      bool: false,
      n: null,
      u: undefined,
      sym: Symbol(),
    },
    123,
  ],
  fn: function () {
    return "fn";
  },
  date: new Date(),
  re: /hi\d/gi,
};
let a2 = deepClone(a);
// console.log(a2)
console.log(a2 !== a);
console.log(a2.i === a.i);
console.log(a2.s === a.s);
console.log(a2.bool === a.bool);
console.log(a2.n === a.n);
console.log(a2.u === a.u);
console.log(a2.sym === a.sym);
console.log(a2.obj !== a.obj);
console.log(a2.array !== a.array);
console.log(a2.array[0] !== a.array[0]);
console.log(a2.array[0].i === a.array[0].i);
console.log(a2.array[0].s === a.array[0].s);
console.log(a2.array[0].bool === a.array[0].bool);
console.log(a2.array[0].n === a.array[0].n);
console.log(a2.array[0].u === a.array[0].u);
console.log(a2.array[0].sym === a.array[0].sym);
console.log(a2.array[1] === a.array[1]);
console.log(a2.fn !== a.fn);
console.log(a2.date !== a.date);
console.log(a2.re !== a.re);
