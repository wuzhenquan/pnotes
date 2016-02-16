相关链接
---
[npm](https://www.npmjs.com/)
[yeoman](http://yeoman.io/)
[grunt](http://gruntjs.com/)
[gulp](http://www.gulpjs.com.cn/)
[gulp中文网](http://www.gulpjs.com.cn/)

参考链接

[Grunt 新手一日入门](http://yujiangshui.com/grunt-basic-tutorial/)

nodejs和npm自行安装

grunt
---

#### 安装grunt-cli
你就可以使用grunt命令来执行某个项目中的Gruntfile.js中定义的 task

	npm install -g grunt-cli

#### 生成package.json文件

	npm init

之后会要求你填写信息

#### 在项目中安装grunt

	npm install grunt --save-dev

会在package.json中的devDenpendcies中发现

	"devDependencies": {
    	"grunt": "^0.4.5"
  	}
  	
#### 接下来安装一些常用的插件

- 合并文件:[grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
- 语法检查: [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- scss编译:[grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)
- 压缩文件:[grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- 监听文件变动:[grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
- 建立本地服务器:[grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)

当然不需要一个个安装

	npm install --save-dev grunt-contrib-concat grunt-contrib-jshint grunt-contrib-sass grunt-contrib-uglify grunt-contrib-watch grunt-contrib-connect

### 配置Gruntfile.js语法



所有的代码都要包裹在

	module.exports = function(grunt) {
	    ...任务配置代码、插件加载代码、任务注册代码
   	};
	

里面, 没有为什么	

以grunt-contrib-uglify插件为例

任务配置代码

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    uglify: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      },
	      build: {
	        src: 'src/<%= pkg.name %>.js',
	        dest: 'build/<%= pkg.name %>.min.js'
	      }
	    }
	  });
	  
插件加载代码

	grunt.loadNpmTasks('grunt-contrib-uglify');
	
任务注册代码

	grunt.registerTask('default', ['uglify']);不能重名	
	
执行grunt, 成功

> 注意: 如果任务注册代码为

> grunt.registerTask('outputcss',['sass']);

> grunt.registerTask('default');

> 执行grunt会报undefined错, 执行grunt outputcss不会

> 因为grunt.registerTask('default');default task 里面没有定义任何项目

### 项目文件传输与协作

当小明用 git 上传 Github 的时候，傻了眼，项目里 node_modules 文件夹下面的东西要十几M呢，这比我项目本身还大，上传下载都不方便。

其实这些插件和 grunt 不需要上传，因为有 package.json 这个文件记录了你这个项目中依赖的 grunt 插件，你只需要上传这个文件即可。下载下来之后，只需要在这个项目文件夹下面，输入命令 npm install，NPM 会自动读取 package.json 文件，将 grunt 和有关插件给你下载下来，很方便的。











