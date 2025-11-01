// let str = 'aabbAbbCCsa123'
// // 转成：'aabb-abb-csa123'


// let reg = /([^A-Z]*)([A-Z]+)(.*)/g

// let item
// let res = ''

// while ((item = reg.exec(str)) !== null) {
//     console.log(item)
//     res = res.concat(item[1]).concat('-', item[2].toLowerCase())
// }

// console.log(res)



let str = 'aabbAbbCsa123';
// 正则全局匹配「小写字母+大写字母」，插入 '-'
// let res = str.replace(/([a-z])([A-Z])/g, '$1-$2');

// let str = 'aabbAbbCsa123';
// 回调函数中，$2（大写字母）通过 toLowerCase() 转小写
let res = str.replace(/([a-z])([A-Z])/g, (match, group1, group2) => {
    console.log(match, group1, group2)
    return `${group1}-${group2.toLowerCase()}`;
});
console.log(res); 