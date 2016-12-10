- `webpack -h` 查看当前版本的安装信息 以及可以使用的指令
- `npm info webpack`查看 webpack 版本信息
- `npm install webpack@1.12.x --save-dev`安装指定版本的 webpack
- `webpack --progress --colors`让编译的输出内容带有 **进度** 和 **颜色**
- `webpack --watch`启动监听模式




#### 常用命令

- webpack 最基本的启动webpack命令
- webpack -w 提供watch方法，实时进行打包更新
- webpack -p 对打包后的文件进行压缩
- webpack -d 提供SourceMaps，方便调试
- webpack --progress --colors 输出结果带进度和彩色，比如：会用红色显示耗时较长的步骤
- webpack --profile 输出性能数据，可以看到每一步的耗时
- webpack --display-modules #默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
