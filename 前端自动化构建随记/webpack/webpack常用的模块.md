### loader

- css-loader会遍历css文件，找到所有的url(...)并且处理

  ```shell
  npm install css-loader --save-dev
  ```

- style-loader把所有的样式插入到你页面的一个style tag中

  ```shell
  npm install style-loader --save-dev
  ```

- url-loader 会将样式中引用到的图片转为模块来处理

  ```shell
  npm install url-loader --save-dev
  ```


- sass-loader

  ```shell
  npm install sass-loader --save-dev
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