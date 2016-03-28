## Node.js
> 以下均在OS X下操作

[nodejs4.0课程](http://www.hubwiz.com/course/561e0c8a1bc20c980538e1e8/)    [为什么要使用nodejs--1](http://limu.iteye.com/blog/1013223) 
[为什么要使用nodejs--2](http://www.zhihu.com/question/30597893#answer-15274458)
[怎么判断nodejs安装成功](http://zhidao.baidu.com/question/1430454246120458899.html?qbl=relate_question_0&word=%CE%AA%CA%B2%C3%B4%D2%AA%B0%B2%D7%B0nodejs)

### 安装Node.js

[官网](https://nodejs.org)下载`.pkg`的包, 双击安装即可.

查看node版本, 输入命令行`node -v`
[n的使用](http://blog.sina.com.cn/s/blog_9564cb6e0102vwu6.html)

### 不同版本安装/切换/删除
- 安装n模块:`npm install -g n`(前面可能要价格sudo 我没加)
- 全局安装某个版本:`sudo n 版本号`(不加sudo会出现三个permission denied)
- 删除某个版本`n rm 版本号`
- 切换版本号 `n+回车`再选择
### 起一个web服务器
cd到一个新建立的空文件夹(名为beginning), 建立一个require.js文件, 将[示例代码](https://nodejs.org/en/about/)拷贝进require.js, 保存后在终端上cd到这个beginning文件夹下, 执行`node require.js`

	const http = require('http');//负责创建web服务器及处理http相关的任务等等

	const hostname = '127.0.0.1';
	const port = 1337;
	
	http.createServer((req, res) => {//通过createServer创建一个服务器
	  res.writeHead(200, { 'Content-Type': 'text/plain' });
	  res.end('Hello World\n');
	}).listen(port, hostname, () => {//通过listen在port端口(1337端口)监听请求
	//服务器就ready了, 然后就能收到来自任何端口的请求, 当请求进来的适合, 我们得告诉nodejs下一步应该做什么
	  console.log(`Server running at http://${hostname}:${port}/`);
	});
输入`node`进入执行环境