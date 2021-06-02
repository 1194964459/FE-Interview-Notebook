参考：https://zhuanlan.zhihu.com/p/85093818

## http 1.0 与 http 1.1 的区别：
* 缓存策略:

> 1. http 1.0 的缓存策略主要是依赖header中的If-Modiified-Since,Expire(到期)
> 2. http 1.1 的缓存策略要比http1.0略多,例如 Entity tag(实体标签), If-Unmodified-Since, If-Match, If-None-Match等.

* 宽带和网络连接优化:
> http1.0 中会存在一些性能浪费。比如我们的只需要对象中的一部分,但是每次请求返回的却是整个对象
> http1.1 可以返回请求资源的一部分（请求头 设置range头域），应用场景是断点续传

* 错误通知
> http1.1 新增了24个错误状态响应码

* Host头处理
> http1.1 中请求消息和响应消息都支持Host头域

* 长连接
http1.1 支持长连接和请求的流水线(pipelining),在一个TCP链接上可以传送多个http请求和响应.这样就不用多次建立和关闭TCP连接了.

## http 2.0 与 http 1.x 的区别：

* 解析格式：
> http1 的解析是'基于文本协议'的格式解析,而http2.0的协议解析是'二进制格式',更加的强大
* 多路复用(Mutiplexing) : 
> 一个连接上可以有多个request,且可以随机的混在一起,每个不同的request都有对应的id,服务端可以通过request_id来辨别,大大加快了传输速率
* header压缩: 
> http1.x中的header需要携带大量信息.而且每次都要重复发送.
> http2.0使用encode来减少传输的header大小.而且客户端和服务端可以各自缓存(cache)一份header filed表,避免了header的重复传输,还可以减少传输的大小.
* 服务端推送(server push): 可以通过解析html中的依赖,只能的返回所需的其他文件(css或者js等),而不用再发起一次请求.

## http 与 https 的区别：
* https协议需要CA申请证书(换句换说,是要钱的)
* http协议运行在TCP协议之上,传输的内容都是明文传送,安全性较差,而https则是运行在SSL/TLS层之上, 而SSL/TLS层是运行在TCP层之上,https传输的内容都是经过加密的,安全性较高
* http与https使用不同的连接方式.其中http默认用的是80端口,而https默认用的是443端口(uzi打kid的那个443)



