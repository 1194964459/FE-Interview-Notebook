# location、referer、origin 比较

完整的 URL结构如下：<br/><br/>
![URL路径参数解析](../Network/icon/url%20路径参数.png)


## Location：当前页面的完整URL信息（对象）
location是个对象，location.href 才是当前URL的完整路径。

如何获取当当前页面的url❓
window.location 是一个全局对象，它代表**当前页面的完整URL信息**，只读属性

> 常用的几个方法：
> * window.location.assign()：加载指定 URL 的新文档。与直接修改 window.location.href 类似；会在浏览器记录中新增条目，可通过「后退」按钮返回上一页。
> * replace(url)：文档替换。原页面被替换，所以无法通过「后退」按钮返回原页面。
> * reload：重新加载当前页面。

* location.href：返回当前URL的完整路径
* location.protocol：协议
* Origin = 协议 + 域名 + 端口
* ... 其他如port、host等等都可以


## Referer：当前页面的来源页面 URL，是URL的核心标识
referer 代表用户是从哪个页面跳转过来的，通过 `document.referrer` 读取当前页面的来源 URL。

部分场景会隐藏 referer（如 HTTPS 页面跳转到 HTTP 页面，或服务器配置了 Referrer-Policy）。


## Origin：协议 + 域名 + 端口
浏览器的 “同源策略” 基于 origin 判断：只有 origin 完全相同的页面，才能相互访问资源（如 **Cookie、DOM**）。

通过 `location.origin` 获取当前页面的 origin


## 疑问：如何让一个页面跳转到指定页面？
* 通过修改location.href值：
    1. 设置`<a>`标签的 href 属性
    2. window.location.assign()
    3. window.location.assign()

* 使用 HTML5 History API：  
可以在不重新加载页面的情况下改变浏览器历史记录，实现单页应用（SPA）中的页面跳转。例如，history.pushState({ page: 1 }, "title 1", "?page=1");将新的状态和 URL 添加到历史记录中，history.replaceState(state, title, url)可以修改当前历史记录的状态和 URL。
