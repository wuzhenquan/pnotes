#### tips
- 文件夹下有package.json的话, 在终端输入`npm install`就会安装所有依赖的模块

####几个npm的常用命令

> moduleName 表示的是一个模块的名字

- npm -v #显示版本，检查npm 是否正确安装。 
- npm install moduleName #安装moduleName模块 
- npm install -g moduleName #全局安装moduleName模块 
- npm list #列出已安装模块 
- npm show moduleName #显示模块详情 
- npm ls 查看 目录下所有安装的 packages 及其版本
- npm outdated 查看哪些 packages 已经变成旧版本了
- npm update #升级当前目录下的项目的所有模块 
- npm update moduleName #升级当前目录下的项目的指定模块 
- npm update -g moduleName #升级全局安装的moduleName模块 
- npm uninstall moduleName #删除指定的模块
- npm outdated 查看当前目录下哪些包可更新
- npm update 更新当前目录下所有的包
- sudo npm install npm -g 升级 npm 


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


### 参考链接

[npm中文文档-元数据的定义](https://github.com/ericdum/mujiang.info/issues/6/)







