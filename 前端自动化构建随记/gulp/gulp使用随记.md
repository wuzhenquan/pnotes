相关链接
---

[npm](https://www.npmjs.com/)
[gulp](http://www.gulpjs.com.cn/)
[gulp中文网](http://www.gulpjs.com.cn/)

[打造一个自动化的前端项目](https://www.awesomes.cn/source/9)

[例子](https://github.com/awesomes-cn/auto-web)

安装
----
全局安装

	$ npm install gulp -g

#### 生成package.json文件

	npm init

之后会要求你填写信息

#### 在项目中安装gulp

	npm install gulp --save-dev

将gulp安装到项目文件内，并纪录在package.json内的devDependencies。

全局安装了gulp，项目也安装了gulp，全局安装gulp是为了执行gulp任务，本地安装gulp则是为了调用gulp插件的功能。

#### 安装gulp插件

以gulp-ruby-sass为例, gulp-ruby-sass是插件名

	npm install gulp-ruby-sass --save-dev

这些插件将会安装在node_modules的gulp-ruby-sass目录下，该目录下有一个gulp-ruby-sass的使用帮助文档README.md；

如果要同时安装多个插件的话

	npm install 插件名1 插件名2 插件名3 --save-dev

这些插件都会记录在package.json内的devDependencies中。

#### 配置gulpfile.js

在你的项目根目录下创建一个 gulpfile.js文件

一个最简单的gulpfile.js

```javascript
var gulp = require('gulp')

gulp.task('default', function() {
   console.log('this is the default task')
})
```

一个第二简单的gulpfile.js


以[gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass)为例

```javascript
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
 
//定义一个testLess任务（自定义任务名称）
gulp.task('testSass', function () {
	//定义一个或多个来源档案
    gulp.src('src/sass/index.scss') 
    	//该任务调用的模块
        .pipe(sass()) 
        //设定目的路径,将会在src/css下生成index.css
        .pipe(gulp.dest('src/css')); 
});
 
//定义默认任务 
gulp.task('default',['testSass', 'elseTask']);
```

执行`gulp 任务名称` 调用对应的任务, 例如:

```javascript
gulp testSass//会编译scss文件
```

执行`gulp default`或`gulp`会调用default里面的所有任务['testSass', 'elseTask']

详细解释
​	 
- gulp.task(name, fn) 
  - 定义任务  
  - name：任务名称 
  - fn：回调函数
- gulp.dest(path[, options]) 
  - 处理完后文件生成路径	
  - path: 处理完后文件路径(最后不要文件名)

  gulp API docs
---
[中文文档1](http://www.ydcss.com/archives/424)
[中文文档2](http://www.gulpjs.com.cn/docs/api/)
[英文文档](https://github.com/gulpjs/gulp/blob/master/docs/API.md)

接下来是自己的理解

### gulp.task(name [, deps, fn])

定义一个gulp任务, 有三个参数

- name: 类型(必填)：String 任务名称(自定义任务的名字)
- deps: 类型(可选)：StringArray 该任务依赖的任务(注意被依赖的任务需要返回当前任务的事件流)
- fn: 类型(必填)：Function 用函数来定义所要执行的操作

示例

	gulp.task('testLess', function () {
	    return gulp.src(['less/style.less'])
	        .pipe(less())
	        .pipe(gulp.dest('./css'));
	});
	
	//执行完testLess任务后再执行minicss任务
	gulp.task('minicss', ['testLess'], function () { 
		    gulp.src(['css/*.css'])
	        .pipe(minifyCss())
	        .pipe(gulp.dest('./dist/css'));
	});	

### gulp.src(globs[, options])
### gulp.src(globs[, options])

处理的源文件的路径(最后要文件名), 有两个参数

- globs: 类型(必填)：String or StringArray；
  	- `src/a.js`：指定具体文件；
  - `**`：匹配0个或多个子文件夹 例`src/**/*.js`(包含src的0个或多个子文件夹下的js文件)； 
  - `{}`: 匹配多个属性 例：`src/{a,b}.js`(包含a.js和b.js文件)  src/*.{jpg,png,gif}(src下的所有jpg/png/gif文件)；
  - `!`：排除文件    例：`!src/a.js`(不包含src下的a.js文件)；

示例

	var gulp = require('gulp'),
	    less = require('gulp-less');
	 
	gulp.task('testLess', function () {
	    //gulp.src('less/test/style.less')
	    gulp.src(['less/**/*.less','!less/{extend,page}/*.less'])
	        .pipe(less())
	        .pipe(gulp.dest('./css'));
	});

- option: 类型(可选)：Object
  - options.buffer：  类型：Boolean  默认：true 设置为false，将返回file.content的流并且不缓冲文件，处理大文件时非常有用；
  - options.buffer：  类型：Boolean  默认：true 设置为false，将返回file.content的流并且不缓冲文件，处理大文件时非常有用；
  - options.base：  类型：String  设置输出路径以某个路径的某个组成部分为基础向后拼接，具体看下面示例：

示例
​	
	gulp.src('client/js/**/*.js') 
	  .pipe(minify())
	  .pipe(gulp.dest('build'));  // Writes 'build/somedir/somefile.js'
	 
	gulp.src('client/js/**/*.js', { base: 'client' })
	  .pipe(minify())
	  .pipe(gulp.dest('build'));  // Writes 'build/js/somedir/somefile.js'

### gulp.dest(path[, options])

处理完后文件输出的路径, 有两个参数

- path：类型(必填)：String or Function 指定文件输出路径，或者定义函数返回文件输出路径亦可；
- options： 类型(可选)：Object，有2个属性cwd、mode；
  - options.cwd：  类型：String  默认：process.cwd()：前脚本的工作目录的路径 当文件输出路径为相对路径将会用到；
  - options.mode：  类型：String  默认：0777 指定被创建文件夹的权限；

  示例 

  gulp.src('./client/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/templates'))
    .pipe(minify())
    .pipe(gulp.dest('./build/minified_templates'));	
### gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])

用于监听文件变化，文件一修改就会执行指定的任务；

- glob: (必填)：String or StringArray 需要处理的源文件匹配符路径。；
- opts：类型(可选)：Object 具体参看https://github.com/shama/gaze；
- tasks: 类型(必填)：StringArray 需要执行的任务的名称数组；
- cb(event):类型(可选)：Function 每个文件变化执行的回调函数；

示例
​	
	gulp.task('watch1', function () {
	    gulp.watch('less/**/*.less', ['testLess']);
	});
	 
	gulp.task('watch2', function () {
	    gulp.watch('js/**/*.js', function (event) {
	        console.log('File'+event.path+'was'+event.type +',running tasks');
	    });
	});

常用插件
---

- [编译sass（gulp-sass](https://github.com/sindresorhus/gulp-ruby-sass)
- [自动添加css前缀(gulp-Autoprefixer)](https://github.com/Metrime/gulp-autoprefixer)
- [压缩CSS(minify)](https://github.com/murphydanger/gulp-minify-css)
- [js代码校验(JSHint)](https://github.com/spalger/gulp-jshint)
- [合并js文件(gulp-concat)](https://github.com/contra/gulp-concat)
- [压缩js代码(gulp-uglify)](https://github.com/terinjokes/gulp-uglify)
- [图片压缩(gulp-imagemin)](https://github.com/sindresorhus/gulp-imagemin)
- [borwserSync](browsersync.io)
- [清理档案](https://github.com/peter-vilja/gulp-clean)
- [图片快取，只有更改过得图片会进行压缩（gulp-cache）
  ](https://github.com/jgable/gulp-cache/)
- [更改提醒(gulp-notify)](https://github.com/mikaelbr/gulp-notify)
- [jasmine](http://blog.csdn.net/luqin1988/article/details/8701611)

执行下列指令来安装这些外挂:

	npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-clean gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev

完整的gulpfile.js

	// 载入外挂
	var gulp = require('gulp'), 
	    sass = require('gulp-ruby-sass'),
	    autoprefixer = require('gulp-autoprefixer'),
	    minifycss = require('gulp-minify-css'),
	    jshint = require('gulp-jshint'),
	    uglify = require('gulp-uglify'),
	    imagemin = require('gulp-imagemin'),
	    rename = require('gulp-rename'),
	    clean = require('gulp-clean'),
	    concat = require('gulp-concat'),
	    notify = require('gulp-notify'),
	    cache = require('gulp-cache'),
	    livereload = require('gulp-livereload');
	 
	// 样式
	gulp.task('styles', function() { 
	  return gulp.src('src/styles/main.scss')
	    .pipe(sass({ style: 'expanded', }))
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    .pipe(gulp.dest('dist/styles'))
	    .pipe(rename({ suffix: '.min' }))
	    .pipe(minifycss())
	    .pipe(gulp.dest('dist/styles'))
	    .pipe(notify({ message: 'Styles task complete' }));
	});
	 
	// 脚本
	gulp.task('scripts', function() { 
	  return gulp.src('src/scripts/**/*.js')
	    .pipe(jshint('.jshintrc'))
	    .pipe(jshint.reporter('default'))
	    .pipe(concat('main.js'))
	    .pipe(gulp.dest('dist/scripts'))
	    .pipe(rename({ suffix: '.min' }))
	    .pipe(uglify())
	    .pipe(gulp.dest('dist/scripts'))
	    .pipe(notify({ message: 'Scripts task complete' }));
	});
	 
	// 图片
	gulp.task('images', function() { 
	  return gulp.src('src/images/**/*')
	    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	    .pipe(gulp.dest('dist/images'))
	    .pipe(notify({ message: 'Images task complete' }));
	});
	 
	// 清理
	gulp.task('clean', function() { 
	  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
	    .pipe(clean());
	});
	 
	// 预设任务
	gulp.task('default', ['clean'], function() { 
	    gulp.start('styles', 'scripts', 'images');
	});
	 
	// 看手
	gulp.task('watch', function() {
	 
	  // 看守所有.scss档
	  gulp.watch('src/styles/**/*.scss', ['styles']);
	 
	  // 看守所有.js档
	  gulp.watch('src/scripts/**/*.js', ['scripts']);
	 
	  // 看守所有图片档
	  gulp.watch('src/images/**/*', ['images']);
	 
	  // 建立即时重整伺服器
	  var server = livereload();
	 
	  // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
	  gulp.watch(['dist/**']).on('change', function(file) {
	    server.changed(file.path);
	  });
	 
	});

## 使用中出现的gulp错误和问题

#### 问题1

在使用uglify的时候

	gulp.task('compress', function() {
	return gulp.src('./js/a.js')
	    .pipe(uglify())
	    .pipe(gulp.dest('./dist/minjs'));
	});

终端显示uglify报错
为了找出错误
修改uglify内的代码

	gulp.task('compress', function() {
	return gulp.src('./js/a.js')
	    .pipe(uglify().on('error', function(e){
	        console.log(e);
	     }))
	    .pipe(gulp.dest('./dist/minjs'));
	});

这样就可以在终端上打印出错误日志(在顶部), 发现原来是a.js语法错误


