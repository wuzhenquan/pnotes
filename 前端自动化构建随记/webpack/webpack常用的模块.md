### loader

- css-loader会遍历css文件，找到所有的url(...)并且处理

  ```shell
  npm install css-loader --save-dev
  ```

- style-loader把所有的样式插入到你页面的一个style tag中

  ```shell
  npm install style-loader --save-dev
  ```

  ```javascript
  module: {
   loaders: [{
    test: /\.css$/,
    loader: ‘style!css’ // (short for style-loader!css-loader)
   }]
  }
  ```

- url-loader 会将样式中引用到的图片转为模块来处理

  ```shell
  npm install url-loader --save-dev
  ```
  ```javascript
  // 通过给 url-loader 配置参数使得当加载小于 1024 bytes 的图片时使用 base64 字符串的格式，我们可以将 1024 这个大小的配置通过两种方式传给 url-loader。
  // 第一种方式 use "?" just like in URLs
  {
    test: /\.png$/,
    loaders: "url-loaders?limit = 1024"
  },
  // 第二种方式 use "query" property
  {
    test: /\.png$/,  
    loaders: "url-loader",
    query: {limit: 1024} 
  }
  ```

- sass-loader

  ```shell
  npm install sass-loader --save-dev
  ```


- babel-loader

  ```javascript
  // webpack.config.js 配置
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'] // 要使用的编译器
        }
      }
    ]
  }
  // 但是! 许多项目中 babel 的配置可能会很大，所以你可以在项目跟目录下建一个 .babelrc 来管理 babel 配置。babel-loader 会自动检测该文件是否存在并应用配置。
  //webpack.config.js 配置
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
  //.bablerc 配置
  { "presets": ["react", "es2015"]}
  ```

### webpack插件

**webpack-dev-server**

当代码更新的时候自动刷新浏览器

方式一:

在 `webpack.config.js` 中声明一个 `devServer` 的对象

```javascript
module.exports = {
  ...
  devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
     },
  ...
}
```

方式二:

```shell
# 安装
npm install webpack-dev-server -g
# 运行
webpack-dev-server --hot --inline
```
方式三: 

```shell
# 安装
npm install webpack-dev-server --save-dev
# 在 package.json 中指定
"scripts": {  "start": "webpack-dev-server --line --hot"}
# 用法
npm run start
```

其实方式二和方式三是一样的啦😅

**html-webpack-plugin**

自动生成HTML

```shell
  npm install html-webpack-plugin --save-dev
```

**CommonsChunkPlugin**

(自带)把入口文件里面的数组打包成verdors.js

**UglifyJsPlugin**

(自带)这个使用uglifyJs压缩你的js代码