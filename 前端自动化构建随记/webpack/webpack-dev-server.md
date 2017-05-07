webpack-dev-server有两种模式支持自动刷新

- 使用iframe模式无需额外的配置，只需在浏览器输入http://localhost:8080/webpack-dev-server/index.html
- 使用inline模式有两种方式：命令行方式和Node.js API
  - 命令行方式: `webpack-dev-server --inline`. 使用webpack-dev-server命令行的时候，会自动查找名为webpack.config.js的配置文件. 如果你的配置文件名称不是webpack.config.js，需要在命令行中指明配置文件。例如，我的配置文件是webpack.config.dev.js：`webpack-dev-server --inline --config webpack.config.dev.js`
  - Node.js API方式需要手动把`webpack-dev-server/client?http://localhost:8080`加到配置文件的入口文件配置处，因为webpack-dev-server没有`inline:true`这个配置项

webpac-dev-server支持Hot Module Replacement，即模块热替换，在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。使用HMR功能也有两种方式：命令行方式和Node.js API。

引用: [WEBPACK DEV SERVER](http://www.jianshu.com/p/941bfaf13be1)