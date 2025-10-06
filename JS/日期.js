const t = 1700965800000  // 毫秒时间戳

const tt = new Date(t)
/**
 * new Date(t): 2023-11-26T02:30:00.000Z, 返回值同toJSON()、toISOString()
 * Date.now(): 1701073409452
 * getTime() 1700965800000  // 返回一个数值，表示从 1970 年 1 月 1 日 0 时 0 分 0 秒（UTC，即协调世界时）距离该 Date 对象所代表时间的毫秒数
 * getTimezoneOffset(): -480
 */
console.log('new Date(t):', new Date(t))
console.log('Date.now():', Date.now())  // 当前时间的毫秒数
console.log('getTime()', tt.getTime())  // 某个时间tt的毫秒数
console.log('getTimezoneOffset():', tt.getTimezoneOffset())
console.log('-------', '\n')

/**
 *  getFullYear(): 2023
 *  getMonth(): 10
 *  getDate(): 26
 *  getDay(): 0
 *  getHours(): 10
 *  getMinutes(): 30
 *  getSeconds(): 0
 *  getMilliseconds(): 0
 */
console.log('getFullYear():', tt.getFullYear())  // 四位数
console.log('getMonth():', tt.getMonth())  // 0~11
console.log('getDate():', tt.getDate()) // 每个月中的日期，取值范围为1~31
console.log('getDay():', tt.getDay())   // 星期几？取值范围为0~6, 星期天为0
console.log('getHours():', tt.getHours())  // 0~23
console.log('getMinutes():', tt.getMinutes())  // 0~59
console.log('getSeconds():', tt.getSeconds())  // 0~59
console.log('getMilliseconds():', tt.getMilliseconds())  // 0~999

console.log('-------', '\n')

/**
 * getUTCFullYear() 2023
 * getUTCMonth: 10
 * getUTCDate() 26
 * getUTCDay() 0
 * getUTCHours: 2   // TODO:get与getUTC：除hours不同外，其他均一样！ h_UTC + 8 = h
 * getUTCMinutes: 30
 * getUTCSeconds: 0
 * getUTCMilliseconds: 0
 */
console.log('getUTCFullYear()', tt.getUTCFullYear())
console.log('getUTCMonth:', tt.getUTCMonth())
console.log('getUTCDate()', tt.getUTCDate())
console.log('getUTCDay()', tt.getUTCDay())
console.log('getUTCHours:', tt.getUTCHours())
console.log('getUTCMinutes:', tt.getUTCMinutes())
console.log('getUTCSeconds:', tt.getUTCSeconds())
console.log('getUTCMilliseconds:', tt.getUTCMilliseconds())

console.log('-------', '\n')


/**
 * toDateString(): Sun Nov 26 2023
 * toISOString(): 2023-11-26T02:30:00.000Z
 * toJSON(): 2023-11-26T02:30:00.000Z，同toISOString()
 * toLocaleDateString(): 2023/11/26
 * toLocaleString(): 2023/11/26 10:30:00  
 * toLocaleTimeString(): 10:30:00
 * toString(): Sun Nov 26 2023 10:30:00 GMT+0800 (中国标准时间)
 * toTimeString(): 10:30:00 GMT+0800 (中国标准时间)
 * toUTCString(): Sun, 26 Nov 2023 02:30:00 GMT
 */
console.log('toDateString:', tt.toDateString())
console.log('toISOString：', tt.toISOString())
console.log('toJSON:', tt.toJSON())
console.log('toLocaleDateString:', tt.toLocaleDateString())
console.log('toLocaleString:', tt.toLocaleString())
console.log('toLocaleTimeString:', tt.toLocaleTimeString())
console.log('toString:', tt.toString())
console.log('toTimeString:', tt.toTimeString())
console.log('toUTCString:', tt.toUTCString())


/**
 * 总结： 有2种时区：GMT(中国标准时间)、UTC(世界标准时间，或ISO), 两者关系是UTC+8=GMT
 * 比较实用的方法：toLocaleString(), 等于 toLocaleDateString() 与 toLocaleTimeString() 的拼接，他们返回的值是GMT时间，准确讲没有UTC或ISO字样的 默认都为GMT时间
 */