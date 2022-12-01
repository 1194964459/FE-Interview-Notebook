let obj = {}
let _map = new Map()

_map.set('a', obj)
console.log(_map)  //  { 'a' => {} }

obj.k = 'kkkk'
console.log(_map)   // { 'a' => { k: 'kkkk' } }
