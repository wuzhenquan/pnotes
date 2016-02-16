
##NPM
[NPM 套件管理工具](https://github.com/nodejs-tw/nodejs-wiki-book/blob/master/zh-tw/node_npm.rst)

查看npm版本. 输入

	npm -v

安装npm的时候
出现错误`npm ERR! Darwin 15.0.0`

解决办法:
[1](http://stackoverflow.com/questions/33181005/error-after-installing-mac-os-x-el-capitan)
[2](https://cnodejs.org/topic/53d51e9e8ed6f4002bc5eb0f)
[3](http://www.imooc.com/qadetail/63277)

	命令行输入:
	sudo chown -R `whoami` ~/.npm
	sudo chown -R `whoami` /usr/local/lib/node_modules
	
#### tips
- 文件夹下有package.json的话, 在终端输入`npm install`就会安装所有依赖的模块

####几个npm的常用命令
- npm -v #显示版本，检查npm 是否正确安装。 
- npm install express #安装express模块 
- npm install -g express #全局安装express模块 
- npm list #列出已安装模块 
- npm show express #显示模块详情 
- npm update #升级当前目录下的项目的所有模块 
- npm update express #升级当前目录下的项目的指定模块 
- npm update -g express #升级全局安装的express模块 
- npm uninstall express #删除指定的模块	


#### npm插件推荐
[anywhere](https://www.npmjs.com/package/anywhere)
#### BrowserSync 多浏览器同步测试工具
[BrowserSync官网](http://www.browsersync.io/)
[Quick Introduction to BrowserSync](https://www.youtube.com/watch?v=heNWfzc7ufQ)

输入`npm install -g browser-sync`后

##### 最简单办法

> 缺点: 修改不同的html还要改命令

一定要有一个名为index.html的文件  **这个不推荐**

	browser-sync start --server --files "css/*.css"
	
如果我们只要监控一个html文件, 比如abc.html, 而且css在abc.html上 

	browser-sync start --server --index abc.html --files="./abc.html"
	
如果要监控一个html文件和一个css文件(css文件在名为css的文件夹), 比如abc.html和style.css

	browser-sync start --server --index abc.html --files="./abc.html, ./css/style.css"








