var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname); //__dirname表示当前目录的绝对路径
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        // 三个入口文件, app, mobile 和 vendors
        app: path.resolve(APP_PATH, 'index.js'),
        mobile: path.resolve(APP_PATH, 'mobile.js'),
        vendors: ['jquery', 'moment']
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
      //这个使用uglifyJs压缩你的js代码
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      //把入口文件里面的数组打包成verdors.js
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      //添加我们的插件 会自动生成一个html文件
      new HtmlwebpackPlugin({
          title: 'Hello World app',
          template: path.resolve(TEM_PATH, 'index.html'),
          filename: 'index.html',
          //chunks这个参数告诉插件要引用entry里面的哪几个入口
          chunks: ['app', 'vendors'],
          //要把script插入到标签里
          inject: 'body'
       }),
      new HtmlwebpackPlugin({
          title: 'Hello Mobile app',
          template: path.resolve(TEM_PATH, 'mobile.html'),
          filename: 'mobile.html',
          chunks: ['mobile','vendors'],
          inject: 'body'
      }),
      // 把一个全局变量插入到所有的代码中 是的依赖jQuery的插件可用
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ],
    // 一种方式是webpack-dev-server --hot --inline
    // 另一种方式是如下写上devServer
    // devServer: {
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    //     progress: true,
    //     contentBase:'./build', // 这个很有用 用来指定打开的目录, 如果没有其他配置的话
                                  // 会打开这个目录先的 index.html 文件
    // },
    module: {
        loaders: [
            {test: /\.scss$/, loaders: ['style', 'css', 'sass'], include: APP_PATH},
            {test: /\.(png|jpg)$/, loader: 'url?limit=40000'},
            {test: /\.jsx?$/, loader: 'babel', include: APP_PATH, query: {presets: ['es2015']}},
        ],
        perLoaders: [
            {
                test: /\.jsx?$/,
                include: APP_PATH,
                loader: 'jshint-loader'
            }
        ]
    },
    devtool: 'eval-source-map',//启用sourcemap 有用?
    //配置jshint的选项，支持es6的校验
    jshint: {
        "esnext": true
    },
};
