HTTP 1.1 的问题：
- 队头阻塞
- header 过大
---
我们写的网页想尽快的打开就要利用这一点，比如把静态资源部署在不同的域名下。这样每个域名都能并发 6-8 个下载请求，网页打开的速度自然就会快很多。

因此，我们的网页就要做打包，也就是需要打包工具把模块合并成多个 chunk 来加载。需要把小图片合并成大图片，通过调整 background:position 来使用。需要把一些 css、图片等内联。而且静态资源的域名也要禁止携带 cookie。

--- 
拦截HTTP 1.0或1.1的通信时看到的样子：
```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
```

拦截HTTP 2.0 的通信时看到的样子：
```
0000   00 00 12 04 00 00 00 00 00 04 10 00 00 00 00 03
0010   02 00 00 00 01 00 00 0f 01 05 00 00 00 01 88 39
0020   8a d7 9b 61 96 d0 7a be 94 10 d1 2a 2d 1b ff c1
0030   9d 75 03 62 00 00 04 08 00 00 00 00 01 00 00 00
0040   00
```