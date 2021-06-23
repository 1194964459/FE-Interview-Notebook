# URL Params解析

```js
function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1]; 
    const paramsArr = paramsStr.split('&'); 

    let paramsObj = {};

    paramsArr.forEach(param => {
        if (/=/.test(param)) { // 处理有 value 的参数
            let [key, val] = param.split('=');
            val = decodeURIComponent(val); 
            val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

                if (paramsObj.hasOwnProperty(key)) { 
                    paramsObj[key] = [].concat(paramsObj[key], val);
                } else { 
                    paramsObj[key] = val;
                }
            } else { // 处理没有 value 的参数
                paramsObj[param] = true;
        }
  })

  return paramsObj;
}
```

使用：

```js
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/
```