####  entry：

指定打包的入口文件，每有一个键值对，就是一个入口文件

三种格式都可以:

- entry-String字符串形式, `entry: './public/src/index.js'`

- entry-Array 数组形式

  ```javascript
  entry: ['./public/src/index.js', './public/src/googleAnalytics.js'],
  out: {
    path: '/dist',
    filename: "bundle.js"
  }  
  // 生成 entry.js 文件
  ```

- entry-Object 对象形式,

  ```javascript
  entry: {
    "indexEntry": './public/src/index.js',
    "profileEntry": './public/src/profile.js'
  },
  out: {
      path: '/dist',
      filename: "[name].js"
  }
  // 生成 index.js 和 profile.js 文件
  ```


​       打包后的 js 名就是 entry 对象的 key: `indexEnetr.js` 和 `profileEntry.js`

还可以混合使用

下面的例子将会生成3个文件

```javascript
{
  entry: {
    "vendor": ['jquery', 'analytics.js', 'optimizely.js'],
    "index": ['./public/src/index.js'],
    "profile": './public/src/profile.js',
  },
  out: {
    path: '/dist',
    filename: "[name].js"
  }
}
// 生成 三个文件 vendor.js, index.js 和 profile.js
```

#### output：

配置打包结果，path定义了输出的文件夹，filename则定义了打包结果文件的名称，filename里面的[name]会由entry中的键（这里是entry1和entry2）替换

`path`和`publicPath`的不同

`path`: 告诉 webpack 应该吧打包好的文件放到哪

`publicPath`: 告诉 webpack 的插件在生产环境下如何更新CSS HTML文件中的URL的

开发环境下的webpack配置

```javascript
entry: __dirname + "/app/main.js",
output: {
  path: __dirname + "/public",
  // 别在开发环境下使用 publicPath,
  // 除非在开发阶段的时候, 像图片这样的静态资源不在本地
  filename: "bundle.js"
}
```

生成环境下的webpack配置

```javascript
entry: __dirname + "/app/main.js",
output: {
  path: __dirname = "/public",
  // PublicPath: 通过使用 webpack 插件(url-loader, file-loader, HtmlWebpackPlugin 等等)
  // 来生成图片, css 样式等的url. 
  // 举例:
  // .image{background-image: url('./test.png')}
  // 会变成
  // .image {background-image: url('http:mycdn.com/test.png')}
  publicPath: "http://mycdn.com/",
  filename: "bundle.js"
}
```

#### resolve：

定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全

#### module：

定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的-  loader对文件进行处理，这正是webpack强大的原因。比如这里定义了凡是.js结尾的文件都是用babel-loader做处理，而.jsx结尾的文件会先经过jsx-loader处理，然后经过babel-loader处理。当然这些loader也需要通过npm install安装

##### loaders

以用 babel-loader 将 ES6 转换成 ES5 的 webpack.config.js 配置为例

```javascript
module: {
 loaders: [{
  test: /\.js$/, // Test for ".js" file, if it passes, use the loader
  exclude: /node_modules/, // Exclude node_modules folder
  loader: 'babel' // use babel (short for ‘babel-loader’)
 }]
}
```

##### 链式 loaders (chaining loaders)

一个文件要使用多个 loaders 可以写成链式加载，链式加载的规则是 **从右向左运行，以”!”为分割**。

例如：假设有一个 `myCssFile.css` 文件你想把文件中的内容插入到 HTML ` <style> CSS content<style>` 标签里，可以使用 `css-loader` 和 `style-loader` 来达到目的。

```javascript
module: {
 loaders: [{
  test: /\.css$/,
  loader: ‘style!css’ // (short for style-loader!css-loader)
 }]
}
```

![图](https://cdn-images-1.medium.com/max/800/1*nes9iLmskmsD8Fp4Ek3u-A.png)

loaders 的工作流程(上图): 

1. Webpack 从入口开始搜索 CSS 依赖，如果在 entry 中的 js 文件找到类似于 `require('mycssfile.css')` 这样的依赖，那就将 `mycssfile.css` 文件中的内容通过 `css-loader` 进行处理。
2. `css-loader` 将所有 CSS 以及 CSS 内的依赖（例如 `@import xxx.css`）写进一个 JSON 里，然后将内容传到 `style-loader` 里。
3. `style-loader` 拿到 JSON 后将内容处理并插入到 HTML 的`` 标签内。

loaders 功能

1. loader 管道：在同一种类型的源文件上，可以同时执行多个 loader ， loader 的执行方式可以类似管道的方式，管道执行的方向为从右到左。
2. loader 可以支持同步和异步
3. loader 可以接收配置参数
4. loader 可以通过正则表达式或者文件后缀指定特定类型的源文件
5. 插件可以提供给 loader 更多功能
6. loader 除了做文件转换以外，还可以创建额外的文件

#### plugins: 

这里定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取出公用的部分，生成common.js.

例如

[UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin)用来将 bundle.js 压缩混淆，以减小大小优化加载速度。

[extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin)插件在内部调用 css-loader 和 style-loader 将所有 css 内容保存为一个 style.css 文件，并且将该文件插入到  HTML 中。

