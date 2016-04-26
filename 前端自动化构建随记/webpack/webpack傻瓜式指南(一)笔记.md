# Webpack傻瓜式指南

  链接:[Webpack傻瓜式指南(一)](http://zhuanlan.zhihu.com/p/20367175?columnSlug=FrontendMagazine)   [Webpack傻瓜指南(二)](http://zhuanlan.zhihu.com/p/20397902)   [Webpack傻瓜指南(三)](http://zhuanlan.zhihu.com/p/20522487) 

  相关链接:[初学webpack遇到的坑](http://www.yatessss.com/2016/01/29/%E5%88%9D%E5%AD%A6webpack%E9%81%87%E5%88%B0%E7%9A%84%E5%9D%91.html)

  ## 指南一

  这一节具体的操作有

- 配置webpack.config.js
- 配置webpack-dev-server
- 添加sass样式
- 处理图片
- 添加第三方库

  ### 配置webpack.config.js

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

  ​```shell
  module.js:339

  ```
  throw err;
  ^
  ```

  Error: Cannot find module 'webpack/lib/node/NodeTemplatePlugin'

  ```
  可以确定的是, 在目录`/usr/local/lib/node_modules/webpack/lib/node`下是有`NodeTemplatePlugin,js`这个文件的.

  看来是执行`webpack`没有找到正确的路径

  原因: 没有给webpack设置NODE_PATH环境变量, 这个环境变量就是`/usr/local/lib/node_modules`这个目录

  什么是环境变量

  ##### 解决方法一

  在当前项目的根目录下运行

  ​```shell
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

  ​

  ### 配置webpack-dev-server

  安装webpack-dev-server

```shell
  npm install webpack-dev-server --save-dev
```

  在config中添加配置

```javascript
  module.exports = {
    ....
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
    },
    ...
  }
```

  然后再package.json里面配置一下运行的命令,npm支持自定义一些命令

```javascript
  ...
  // 在终端运行npm run start 会执行对应的脚本
  "scripts": {
    "start": "webpack-dev-server --hot --inline"
  },
  ...
```

  在项目根目录下输入`npm start`，在浏览器里面输入[http://localhost:8080**](https://link.zhihu.com/?target=http%3A//localhost%3A8080) 发现伟大的hello world出现了

#### 发现

**`hot`和`inline`的作用**

- `inline` 选项用于开启页面的实时加载功能(Live reloading)
- `hot` 选项用于开启**热加载(HMR)**功能, 好用!!!

这两个的区别就是 Livereload 是一次页面刷新，HMR 则是页面不刷新，直接替换更换过后的模块。如果你两个参数都开了，那会**先尝试热加载，如果热加载不行则尝试刷新页面**。

HMR 有什么用？当你要调试一个购票表单，第一步填写信息第二部选择票种，第三步付款。HMR 可以让你在改完代码后直接调试第三部而不是页面刷新，从第一步开始自己输信息。

当代码更新的时候，下面这三种方式都会打包新的文件，但是又有不同。

1. 不帮你刷新页面`webpack-dev-server`
2. 直接帮你刷新整个页面`webpack-dev-server --inline`
3. 仅仅刷新更新过的模块，如果需要的话再刷新整个页面`webpack-dev-server --inline --hot`

[参考链接](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651220238&idx=1&sn=ebdba528f199e10f6b273c3a6fd04650&scene=1&srcid=0419xuvMlwIOldm5sL2MHyzi&key=b28b03434249256b5e7a3aac0a1bfcefd4caeff58ab12c89025ded4dc265ed5ba5501325c12b0d9747dbb26a44a08573&ascene=0&uin=NjA4MTU0NDU%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.3+build(15D21)&version=11000003&pass_ticket=3pccOZTqfEUFrL0WdhmpOelyHalII1cFk3vXNKLyA28%3D)



  ### 添加sass

  css在文章里面也有, 因为没遇到什么bug, 就不提了

  这里想说的是, 都已经开始用webpack, sass还不赶紧学起来, 没必要再写css了.

  安装css-loader style-loader scss-loader

```shell
  npm install css-loader style-loader sass-loader --save-dev
```

  webpack.config.js, 在`loaders`属性中

```javascript
  module: {
          loaders: [
              {test: /\.scss$/, loaders: ['style', 'css', 'sass']}
          ]
      }
```

  在app目录下添加main.scss
  在app目录下的index.js中`require('./main.scss')`

  #### 坑一

  node-sass的版本和目前node不匹配

  运行`npm rebuild node-sass`解决

  ### 处理图片

  安装`url-loader`

```shell
  npm install url-loader --save-dev
```

  webpack.config.js添加loaders

```javascript
  module: {
              loaders: [
                  {test: /\.scss$/, loaders: ['style', 'css', 'sass'], include: APP_PATH},
                  {test: /\.(png|jpg)$/, loader: 'url?limit=40000'}
              ]
          },
```

  ### 添加第三方库

  安装jquery

```shell
  npm install jquery --save-dev
```

  app目录下的index.js

  ```
  var $ = require('jquery');
  ```

  脑海中出现一个硕大的问题, 多个app怎么整合到一起?

### 添加ES6的支持

装loader

```shell
npm install babel-loader babel-preset-es2015 --save-dev
```

 loader配置项添加

```javascript
...
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      },
...
```

  ​
