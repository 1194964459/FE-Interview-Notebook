/**
 * JSON只支持object,array,string,number,true,false,null这几种数据或者值，
 * 时间类型 会被变成字符串类型数据
 * undefined和function会直接丢失
 * NaN、Infinity和-Infinity--- 会变成null
 */

let obj1 = {
  uu: undefined,  // 转为null
  nan: NaN,    // 转为null
  i: Infinity,   // 忽略

  // 
  a: 1,
  b: [1, 2, 3],
  c: 'ccc',
  d: true,
  e: null,
  f: {
    c: 'ccc',
    d: true,
  }
}

let obj2 = JSON.parse(JSON.stringify(obj1))

// obj2.f.c = '1'
// obj2.f.d = false
console.log(obj1)
console.log('\n')
console.log(obj2)

/**
 * 转换后的值：
 * 
{
  nan: null,
  i: null,
  a: 1,
  b: [ 1, 2, 3 ],
  c: 'ccc',
  d: true,
  e: null,
  f: { c: 'ccc', d: true }
}
 */

/**
 * 字符转数字
 * https://harttle.land/2020/11/22/javascript-string-to-number.html
 */
