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
        app: path.resolve(APP_PATH, 'index.js'),
        mobile: path.resolve(APP_PATH, 'mobile.js'),
        //添加要打包在vendors里面的库
        vendors: ['jquery', 'moment']
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: BUILD_PATH,
        //注意 我们修改了bundle.js 用一个数组[name]来代替，他会根据entry的入口文件名称生成多个js文件，这里就是(app.js,mobile.js和vendors.js)
        filename: '[name].js'//
    },
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
    module: {
        loaders: [
            {test: /\.scss$/, loaders: ['style', 'css', 'sass'], include: APP_PATH},
            {test: /\.(png|jpg)$/, loader: 'url?limit=40000'},
            {
              test: /\.jsx?$/, 
              loader: 'babel', 
              include: APP_PATH, 
              // 若是已經單獨使用 .babelrc 作為 presets 設定的話，則可以省略 query
              // preset 則是使用的 babel 轉譯規則，這邊使用 react、es2015
              query: {presets: ['es2015']}
            },
        ],
    },
    devtool: 'eval-source-map',//启用sourcemap 有用?
};
