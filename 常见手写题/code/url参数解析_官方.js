let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'

const parsedUrl = new URL(url)
console.log(parsedUrl.searchParams)
console.log(parsedUrl.searchParams.enabled, '===', parsedUrl.searchParams.get('enabled'))  //
console.log(parsedUrl.searchParams.city, '===', parsedUrl.searchParams.get('city'))
console.log(parsedUrl.searchParams.id, '===', parsedUrl.searchParams.get('id'))  // 123, id属性有多个时取的第一个



// {
//   'user' => 'anonymous',
//   'id' => '123',
//   'id' => '456',
//   'city' => '北京',
//   'enabled' => '' }