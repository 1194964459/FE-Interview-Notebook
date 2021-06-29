JSON.parse(JSON.stringify)实现了一个深拷贝。但是函数、undefined、Date、RegExp等数据类型都不支持，对于它不支持的数据都会直接忽略该属性。 对象不能是环状结构的，否则会导致报错

