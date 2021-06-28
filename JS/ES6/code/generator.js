// 示例1：基于 generator 数组扁平化
// var arr = [1, [[2, 3], 4], [5, 6]];

// var flat = function* (a) {
//     var length = a.length;
//     for (var i = 0; i < length; i++) {
//         var item = a[i];
//         if (typeof item !== 'number') {
//             yield* flat(item);
//         } else {
//             yield item;
//         }
//     }
// };

// for (var f of flat(arr)) {
//     console.log(f);
// }


// 示例2：next()
// function* dataConsumer() {
//     console.log('Started');
//     console.log(`1. ${yield}`);
//     console.log(`2. ${yield}`);
//     return 'result';
// }
  
// let genObj = dataConsumer();
// genObj.next();
// // Started
// genObj.next('a')
// // 1. a
// genObj.next('b')
// // 2. b

// 示例3：给对象添加遍历器接口
function* objectEntries(obj) {
    // let propKeys = Reflect.ownKeys(obj);
    let propKeys = Object.keys(obj)

    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}