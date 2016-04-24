---
title: webpack初探.md
date: 2016-04-10 19:03:27
tags: webpack
---

昨天还对gulp和webpack的关系模糊不清, 今天早上起来看了网络上的技术分享, 现在明白的了

gulp和webpack是相辅相成的关系

gulp的基本作用都清楚了, 一般都是负责编译less/sass, 图片压缩成雪碧图, css/js压缩, 合并之类的一系列工作.

而webpack呢. 还是举个例子吧. 有两个前端, 叫前端小白和前端小黑, 前端小白负责首页的模块, 前端小黑负责个人中心的模块, 现在每个人都在自己的文件夹下写好了各自负责的模块.....不想写了....

参考文章

- [WebPack在项目配置中的探索](https://github.com/MeCKodo/webpack)
- [Webpack，101入门体验](http://html-js.com/article/3009)
- [webpack的特点和优势](http://www.hubwiz.com/class/5670d0a77e7d40946afc5e65)

##### 安装webpack

```shell
$ npm install webpack -g
```

##### 初始化

```shell
$ npm init
```



### loader介绍

Webpack 本身只能处理原生的 JavaScript 模块，但是 loader转换器可以将各种类型的资源(比如`VUE`、`JSX`、`SASS` 或图片)转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。

##### 加载css文件

第一种

1. entry.js文件里(或者其他任何需要加载的css文件)`require('!style!css!./style.css');`

2. 终端

   ```shell
   $ webpack enrty.js bundle.js
   ```

第二种

1. entry.js文件里(或者其他任何需要加载的css文件)`require('./style.css');`

2. 终端输入
   ```shell
   $ webpack entry.js bundle.js "css=style!css" ## 错误
   ## 因为"!"在命令行中具有特殊的含义，所以我们需要对它进行转义操作
   $ webpack entry.js bundle.js "css=style\!css"
   ```


上面两种方法每次都要这样在终端输入 是不是很麻烦?!

因此有了webpack.config.js

### webpack.config.js

默认情况下，在执行的时候, 会搜索当前目录的`webpack.config.js`文件，这个文件是一个 `node.js` 模块，返回一个 `json`格式的配置信息对象，或者通过 `--config` 选项来指定配置文件。

#### webpack.config.js基本结构

```javascript
var Webpack = require("webpack");// 额 好像不要这句也可以
module.exports = {
    entry: ["./entry.js"],
    output: {  // 配置打包结果
        path: __dirname,  // 定义输出文件夹
        filename: "bundle.js"  //打包结果文件的名称
    },
    module: {  // 定义了对模块的处理逻辑
        loaders: [{  // loaders定义一系列的加载器
            test: /\.css$/,  
            loader: "style!css"
        }]
    }
}
```

- `entry`：指入口文件的配置项，它是一个数组的原因是webpack允许多个入口点。 当然如果你只有一个入口的话，也可以直接使用双引号`"./entry.js"`
- `output`：配置打包结果，`path`定义了输出的文件夹，filename则定义了打包结果文件的名称
- `module`：定义了对模块的处理逻辑，这里可以用`loaders`定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的`loader`对文件进行处理，**这正是`webpack`强大的原因**.

#### webpack插件

`Webpack`本身内置了一些常用的插件，还可以通过npm安装第三方插件。

插件可以完成更多loader不能完成的功能。插件的使用一般是在`webpack.config.js`中的`plugins` 选项中指定。

例子

给输出的文件头部添加注释信息`BannerPlugin`的内置插件来实践插件的配置和运行。

```javascript
var Webpack = require('webpack')
module.exports = {
	entry: ['./entry.js'],
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		loaders: [
  			{test: /\.css$/, loader: "style!css"},
			{test:/\.(jpg|png)$/, loader: "url-loader?limit=8192"}
  		]
        
	},
	plugins: [ // 注意这是数组
		new Webpack.BannerPlugin('这里是打包文件头部注释!')
	]
}
```

##### 问题1 `/\.css$/`什么意思?  

`.css`后缀名的文件

##### 问题2 `style!css`什么意思?

使用了`style-loader`和`css-loader`, `!`可以当做是分隔符吧

##### 问题3 `url-loader?limit=100`什么意思?

使用了`url-loader`, 小于8K的 背景图,  转化成base64.

还可以写成`url-loader?limit=100&name=./bbb/[name].[ext]`后面的`name=./bbb/[name].[ext]`表示在当前目录创建一个名字为bbb的目录, 在bbb内放对应的图片(图片名字和格式都和原来的一样)

注意: 直接使用img导入的图也并没有进行base64的转化。


### 一个最简单webpack

其实最简单的在这里 [webpack入坑之旅（一）不是开始的开始](http://guowenfh.github.io/2016/03/24/vue-webpack-01-base/) 里面刚开始介绍的时候通过 `webpack entry.js bundle.js`就可以把`entry.js`生成一个新文件`bundle.js`

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
// 上面这行, 用require("./module1.js")也可以
// 为什么都可以, 因为require的都是js文件, 所以咯, 为了懒得写上".js"呗
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

##### 问题

`path: path.join(__dirname,'out')`中的`__dirname`是?

`__dirname`表示的是当前`webpack.config.js`所在的目录

##### webpack的几种基本命令

```shell
$ webpack // 最基本的启动webpack方法
$ webpack -w // 提供watch方法，实时进行打包更新
$ webpack -p // 对打包后的文件进行压缩，提供production
$ webpack -d // 提供source map，方便调试。
```

- [webpack入门 - 汇智网](http://www.hubwiz.com/course/5670d0a77e7d40946afc5e65/)
- [Webpack 怎么用](https://segmentfault.com/a/1190000002552008)
- [Webpack 入门指迷](https://segmentfault.com/a/1190000002551952)
- [Webpack傻瓜式指南（一）](https://github.com/vikingmute/webpack-for-fools/blob/master/entries/chapter-1.md)
- [Webpack傻瓜式指南（二）](https://github.com/vikingmute/webpack-for-fools/blob/master/entries/chapter-2.md)
- [Vue + webpack 项目实践](http://jiongks.name/blog/just-vue/)
- [webpack 入门及实践](http://www.w3ctech.com/topic/1557)
- [JavaScript 标准参考教程（alpha）–Node.js](http://javascript.ruanyifeng.com/#nodejs)
- [应该是最好懂的Webpack教程—阮一峰](https://github.com/ruanyf/webpack-demos) 还没敲呢，应该全部敲一遍的。
- [webpack常用配置总结](http://www.h-simon.com/42/)
- [Express结合Webpack的全栈自动刷新](https://segmentfault.com/a/1190000004505747)
- [Vue.js官方教程](http://cn.vuejs.org/guide/)
- [vue-router文档](http://vuejs.github.io/vue-router/zh-cn/)



