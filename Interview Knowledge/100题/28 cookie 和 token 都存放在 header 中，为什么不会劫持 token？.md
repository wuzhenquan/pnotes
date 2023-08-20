https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/31

知识点：`xss` `csrf` 

原问题是 [#32](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/32) 

参考文章：[Cookie与Cookie劫持](https://g2ex.top/2015/06/29/Cookie-and-Cookie-Injection/) 

cookie 如何被劫持？

- 利用XSS漏洞获取Cookie
  - 防御方法：Cookie 设置 HttpOnly 

- XSS结合phpinfo页面
  - 防御方法：关闭所有phpinfo类dump request信息的页面
- HTTP Response Splitting
  - 防御方法：针对header的内容做过滤，不能漏掉\r\n，特别是Location，host，referrer等  
- 网络监听
  - 防御方法：网站使用Https协议。

在本问题的语境下，token 默认存储在js自定义http head上，cookie 默认存 sessionId



在xss攻击面前，token 和 cookie 都凉了

在csrf攻击面前，cookie 凉了

token 不是为了防止 xss 的，是为了防止 csrf 的



### 题目可能有点问题，在劫持面前，不管cookie还有token，都能劫持。

只是说： cookie会自动携带上，而token需要设置header才可。

具体说一下xss层面的劫持和csxf层面的劫持：

xss: 劫持cookie或者localStorage，从而伪造用户身份相关信息。前端层面token会存在哪儿？不外乎cookie localStorage sessionStorage,这些东西都是通过js代码获取到的。解决方案：过滤标签<>,不信任用户输入， 对用户身份等cookie层面的信息进行http-only处理。

csxf：是后端过于乐观的将header区的cookie取到（所以这才是主要原因，不是因为会自动携带cookie所以不安全，是后端代码不安全而已），并当作用户信息进行相关操作。解决方案也很简单，对于cookie不信任，对每次请求都进行身份验证，比如token的处理。

### 所以说，不管cookie token都能劫持，对开发者而言，做好这两种攻击即可。



结论：只有防止 xss 和 csrf，才能防止劫持。



