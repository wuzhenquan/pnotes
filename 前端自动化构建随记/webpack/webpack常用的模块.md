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

#### webpack插件

- webpack-dev-server当代码更新的时候自动刷新浏览器

  ```shell
  # 安装
  npm install webpack-dev-server -g
  # 运行
  webpack-dev-server
  ```

- html-webpack-plugin自动生成HTML

  ```shell
  npm install html-webpack-plugin --save-dev
  ```


- CommonsChunkPlugin(自带)把入口文件里面的数组打包成verdors.js
- UglifyJsPlugin(自带)这个使用uglifyJs压缩你的js代码