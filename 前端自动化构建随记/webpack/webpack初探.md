## webpack初探

昨天还对gulp和webpack的关系模糊不清, 今天早上起来看了网络上的技术分享, 现在明白的了

gulp和webpack是相辅相成的关系

gulp的基本作用都清楚了, 一般都是负责编译less/sass, 图片压缩成雪碧图, css/js压缩, 合并之类的一系列工作.

而webpack呢. 还是举个例子吧. 有两个前端, 叫前端小白和前端小黑, 前端小白负责首页的模块, 前端小黑负责个人中心的模块, 现在每个人都在自己的文件夹下写好了各自负责的模块.....不想写了....

参考文章

- [WebPack在项目配置中的探索](https://github.com/MeCKodo/webpack)
- [Webpack，101入门体验](http://html-js.com/article/3009)



##### 安装webpack

```shell
$ npm install webpack -g
```

##### 初始化

```shell
$ npm init
```

### 一个最简单webpack

##### 初始化文件目录

```
webpack101
    --- src
        --- entry.js
        --- module1.js
    --- index.html
    --- package.json
    --- webpack.config.js
```

##### 编写入口文件

```javascript
// entry.js
require("./module1"); // 使用CommonJs来加载模块
```

```javascript
// module1.js
console.log("Hello Webpack!");
```

##### webpack.config.js配置

```javascript
var path = require("path");// 引入path对象(node里的, path对象有很多方法.)

module.exports = {
    entry: '../src/entry.js', //演示单入口文件
    output: {
        path: path.join(__dirname, 'out'),  //打包输出的路径
        filename: 'bundle.js',              //打包后的名字
        publicPath: "./out/"                //html引用路径，在这里是本地地址。
    }
};
```

##### webpack的几种基本命令

```shell
$ webpack // 最基本的启动webpack方法
$ webpack -w // 提供watch方法，实时进行打包更新
$ webpack -p // 对打包后的文件进行压缩，提供production
$ webpack -d // 提供source map，方便调试。
```

## Webpack傻瓜式指南

链接:[Webpack傻瓜式指南(一)](http://zhuanlan.zhihu.com/p/20367175?columnSlug=FrontendMagazine)   [Webpack傻瓜指南(二)](http://zhuanlan.zhihu.com/p/20397902)   [Webpack傻瓜指南(三)](http://zhuanlan.zhihu.com/p/20522487) 

相关链接:[初学webpack遇到的坑](http://www.yatessss.com/2016/01/29/%E5%88%9D%E5%AD%A6webpack%E9%81%87%E5%88%B0%E7%9A%84%E5%9D%91.html)

### 指南一

这一节具体的操作有

- 配置webpack

- 配置webpack-dev-server

- 添加CSS样式

  ​

webpack.config.js



```javascript
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);//__dirname表示当前目录的绝对路径
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
console.log(__dirname)

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: APP_PATH,
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app'
    })
  ]
};
```

> 如果想要打印出webpack.config.js的某些内容, 直接`console.log()`便会在终端上输出

#### 一坑

按文章的步骤建立好自己的第一个项目后, 在当前项目根目录下运行`webpack`, 出现了这样的错误

```shell
module.js:339
    throw err;
    ^
Error: Cannot find module 'webpack/lib/node/NodeTemplatePlugin'
```

可以确定的是, 在目录`/usr/local/lib/node_modules/webpack/lib/node`下是有`NodeTemplatePlugin,js`这个文件的.

看来是执行`webpack`没有找到正确的路径

原因: 没有给webpack设置NODE_PATH环境变量, 这个环境变量就是`/usr/local/lib/node_modules`这个目录

什么是环境变量

##### 解决方法一

在当前项目的根目录下运行

```shell
# 这句的目的是为了指定 NODE_PATH 变量
export NODE_PATH="/usr/local/node_modules:/usr/local/lib/node_modules"
```

后, 再运行webpack, 顺利完成了这个简单项目的构建.

让人觉得神奇的是, 新打开一个shell窗口, 再执行`webpack`, 出现了同样的错误........

找到方法啦

在.zshrc文件下添加`export NODE_PATH="/usr/local/node_modules:/usr/local/lib/node_modules"`这一行.或者直接在命令行输入

```shell
echo 'export NODE_PATH="/usr/local/node_modules:/usr/local/lib/node_modules"' >> ~/.zshrc 
```

我用的是zsh, 如果是bash的话, 把.zshrc改成.bashrc

[参考链接](https://github.com/LeeChingYin/webpack/blob/e62b2ae5841a07d91fc0246b4d91b9a9527f62da/README.md)

##### 解决方法二

不要全局安装webpack, 尝试当前项目下安装

```
npm install webpack --save-dev
```

此时出现了一个错误

```shell
# 第6个错误显示
npm ERR! Refusing to install webpack as a dependency of itself
```

原因在于, 之前`npm init`的时候一直按回车, 由于目录名是`webpack`, `package.json`的`name`也默认为`webpack`了, 因此这个项目的包名也叫`webpack`, 当然就不能安装和自己包名一样的包, 于是我们把`package.json`里的`name`改成其他名. 比如`name:webpack-test;`就可以安装了 [参考链接](http://stackoverflow.com/questions/27267707/npm-warn-install-refusing-to-install-hapi-as-a-dependency-of-itself)