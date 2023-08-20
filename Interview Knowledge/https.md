https://blog.leapmie.com/archives/418/#%E6%80%BB%E7%BB%93

![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQqrl2wsAt33gEXuTrpLTahWqL16Qsojrp6xicbOFfSVzIBRZGGPIW7s05USVLyfm9prnC7VoklRd1w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**Q：HTTPS 为什么安全？**



**A：**因为 HTTPS 保证了传输安全，防止传输过程被监听、防止数据被窃取，可以确认网站的真实性。



**Q：HTTPS 的传输过程是怎样的？**



**A：**客户端发起 HTTPS 请求，服务端返回证书，客户端对证书进行验证，验证通过后本地生成用于改造对称加密算法的随机数。



通过证书中的公钥对随机数进行加密传输到服务端，服务端接收后通过私钥解密得到随机数，之后的数据交互通过对称加密算法进行加解密。



**Q：为什么需要证书？**



**A：**防止“中间人”攻击，同时可以为网站提供身份证明。

![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQqrl2wsAt33gEXuTrpLTahWCxpupqAdqp8MBQ9q321beGvAoiannaJRhcJ2dnHAMbzzicgNfXxhyDFg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



**Q：使用 HTTPS 会被抓包吗？**



**A：**会被抓包，HTTPS 只防止用户在不知情的情况下通信被监听，如果用户主动授信，是可以构建“中间人”网络，代理软件可以对传输内容进行解密。

![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQqrl2wsAt33gEXuTrpLTahWeRiaTE40pPQakT8mewwTpUoXQ7EUDfZtA4cnO8OdYiccdlGo4rcZDia3A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)