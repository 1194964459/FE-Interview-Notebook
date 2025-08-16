function parseParam(url) {
    const arr = /\?([^#.]+)(\#.*)?/.exec(url)
    // const arr = url.match(/\?([^#.]+)(\#.*)?/)  //两者是等价的

    if (arr === null) {
        return ''
    }
    const paramsStr = arr[1];
    const paramsArr = paramsStr.split('&');

    let paramsObj = {};

    paramsArr.forEach(param => {
        if (/=/.test(param)) { // 处理有 value 的参数
            let [key, val] = param.split('=');
            val = decodeURIComponent(val);
            if (paramsObj.hasOwnProperty(key)) {
                paramsObj[key] = [].concat(paramsObj[key], val);
            } else {
                paramsObj[key] = val;
            }
        } else {
            paramsObj[param] = true;   // 处理没有 value 的参数，默认设为true
        }
    })

    return paramsObj;
}

// 示例用法
const testUrl1 = "https://example.com/path?name=John&age=30&city=New%20York&name=we#hass=aa";
const testUrl2 = "https://example.com/page?search=javascript&sort=asc#section1";
const testUrl3 = "https://example.com";
const testUrl4 = "https://example.com?aa";



console.log(parseParam(testUrl1))
// 输出: { name: "John", age: "30", city: "New York" }

console.log(parseParam(testUrl2))
// 输出: { search: "javascript", sort: "asc" }

console.log(parseParam(testUrl3))
// 输出: null

console.log(parseParam(testUrl4))


/**
调用 exec()的值：
[
    '?name=John&age=30&city=New%20York&name=we',
    'name=John&age=30&city=New%20York&name=we',
    index: 24,
    input: 'https://example.com/path?name=John&age=30&city=New%20York&name=we',
    groups: undefined
] 
*/
