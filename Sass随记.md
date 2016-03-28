
[sass类库**tobe**](http://tobe.w3cplus.com/example/begin/begin.html)

- 中文编译 出错的问题，需要指定字符集`@charset "utf-8";`
- 变量声明 [参考链接w3cplus](http://www.w3cplus.com/preprocessor/sass-basic-variable.html)
	- 旧版本的sass在有全局变量的情况下sass是没有局部变量的**但是!这是以前的,!现在已经有全局变量和局部变量了!详情看上面链接的评论**
	- 普通变量
	- 默认变量!default 上面的链接说明了!default对组件化开发的作用
	- 变量后面加`...` 解决`@mixin`以`,`来分隔的参数和css3以`,`分隔的属性之间的冲突
	- 变量用`#{}`包裹 用来设置[属性选择器变量](http://www.w3cplus.com/preprocessor/sass-selector-variables.html)
	- 多个变量一起声明
- 嵌套
	- 选择器嵌套(`&`操作符置前表示父集, 之后表示子集)
	- 属性嵌套
	- 伪类嵌套