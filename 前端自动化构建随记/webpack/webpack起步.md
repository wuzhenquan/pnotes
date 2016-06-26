第一步 Node.js

首先需要到 [http://nodejs.org/](http://nodejs.org/) 下载安装最新版本的 Node.js

第二步 webpack-cli

Node.js 安装好过后，打开命令行终端，通过 npm 命令安装：

```shell
// -g 参数表示全局安装
$ npm install webpack -g
```

第三步 新建空前端项目

```
.
├── index.html      // 入口 HTML  
├── dist            // dist 目录放置编译过后的文件文件
└── src             // src 目录放置源文件
    └── index.js    // 入口 js 
```

其中 html 内容:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hello React!</title>
</head>
<body>
  <div id="AppRoot"></div>
  <script src="dist/index.js"></script>
</body>
</html>
```

index.js 内容为:

```javascript
alert('hello world webpack');
```

第四步 在项目中安装 webpack

```shell

# 初始化 package.json,  根据提示填写 package.json 的相关信息
$ npm init
# 下载 webpack 依赖 
# --save-dev 表示将依赖添加到 package.json 中的 'devDependencies' 对象中
$  npm install webpack --save-dev
```

第五步：Develop Server 工具 （可选）

dev server 可以实现一个基于 node + express 的前端 server

```shell
$ npm install webpack-dev-server --save-dev
```

第六步: npm install 依赖模块

```shell
# babel 相关的模块
$ npm install babel-loader babel-core babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-polyfill --save-dev

# react 相关的模块
$ npm install react react-dom --save
```

第七步: loader

```shell
$ npm install css-loader style-loader --save-dev
```

第八步: plugin

```shell
# 安装一个 plugin 
$ npm install bell-on-bundler-error-plugin --save-dev
$ npm install html-webpack-plugin --save-dev
```