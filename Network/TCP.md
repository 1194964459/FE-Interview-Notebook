* 传输控制协议（TCP，Transmission Control Protocol）是一种面向连接的、可靠的、基于字节流的传输层通信协议

超时重传，流量拥塞控制

## 概览
![图1 TCP头](https://github.com/1194964459/FE-Interview-Notebook/blob/main/Network/icon/tcp-head.jpeg?raw=true
)
你需要注意这么几点：

* TCP的包是没有IP地址的，那是IP层上的事。但是有源端口和目标端口。
* 一个TCP连接需要四个元组来表示是同一个连接（src_ip, src_port, dst_ip,dst_port）准确说是五元组，还有一个是协议。但因为这里只是说TCP协议，所以，这里我只说四元组。
* 注意上图中的四个非常重要的东西：
* Sequence Number是包的序号，用来'解决网络包乱序（reordering）'问题。
* Acknowledgement Number就是ACK——'用于确认收到，用来解决不丢包'的问题。
* Window又叫Advertised-Window，也就是著名的滑动窗口（Sliding Window），用于解决流控的。
* TCP Flag ，也就是包的类型，主要是用于操控TCP的状态机的。

## 建立连接
TCP是因特网中的传输层协议，使用三次握手协议建立连接。当主动方发出SYN连接请求后，等待对方回答SYN+ACK，并最终对对方的 SYN 执行 ACK 确认。这种建立连接的方法可以'防止产生错误的连接'，TCP使用的'流量控制'协议是可变大小的滑动窗口协议。 

![图2 TCP的三次握手](https://github.com/1194964459/FE-Interview-Notebook/blob/main/Network/icon/tcp-three-handShake.gif?raw=true)

TCP三次握手的过程如下：
1. 客户端发送SYN（SEQ=x）报文给服务器端，进入SYN_SEND状态。
2. 服务器端收到SYN报文，回应一个SYN （SEQ=y）ACK（ACK=x+1）报文，进入SYN_RECV状态。
3. 客户端收到服务器端的SYN报文，回应一个ACK（ACK=y+1）报文，进入Established状态。
三次握手完成，TCP客户端和服务器端成功地建立连接，可以开始传输数据了。


## 连接终止
建立一个连接需要三次握手，而终止一个连接要经过四次握手，这是由TCP的半关闭（half-close）造成的。具体过程如下图所示。 
![图3 TCP连接的终止](https://github.com/1194964459/FE-Interview-Notebook/blob/main/Network/icon/tcp-four-wave.gif?raw=true)

（1） 某个应用进程首先调用close，称该端执行“主动关闭”（active close）。该端的TCP于是发送一个FIN分节，表示数据发送完毕。
（2） 接收到这个FIN的对端执行 “被动关闭”（passive close），这个FIN由TCP确认。
注意：FIN的接收也作为一个文件结束符（end-of-file）传递给接收端应用进程，放在已排队等候该应用进程接收的任何其他数据之后，因为，FIN的接收意味着接收端应用进程在相应连接上再无额外数据可接收。
（3） 一段时间后，接收到这个文件结束符的应用进程将调用close关闭它的套接字。这导致它的TCP也发送一个FIN。
（4） 接收这个最终FIN的原发送端TCP（即执行主动关闭的那一端）确认这个FIN。 [3] 
既然每个方向都需要一个FIN和一个ACK，因此通常需要4个分节。