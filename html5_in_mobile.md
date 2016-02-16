##HTML5 in mobile

一些参考链接:

[如何在 PC 机上测试移动端的网页？](http://www.zhihu.com/question/20322475)

[移动端前端开发与PC端比有哪些不同？](http://www.zhihu.com/question/34364365)

[HTML5从入门到精通](http://www.maiziedu.com/course/web/228-2627/)

[VueJs源码学习笔记](http://jiongks.name/blog/vue-code-review/)

###需要了解的有

HTML5和css3

几乎所有设备屏幕尺寸和像素密度之间的关系

适应各种屏幕

虽然都是webkit内核，但是不同系统下面甚至同一系统不同机型下面，因为内核版本的不同

**web app**
<meta name="apple-mobile-web-app-capable" content="yes">
这个meta的作用是让普通移动网页被添加到主屏幕后，拥有一些类native的功能，很多同学应该都很熟悉了。就是类似隐藏ios的上下状态栏，实现全屏，禁止弹性拖拽，全屏，修改顶部颜色等。

pc端和移动端的事件不同, 比如click和touch, click在iphone上会有半秒左右的延迟, 所以, 在下javascript的时候, 函数和方法进行封装, 用事件去触发这些封装好的函数和方法

zepto可以说是jquery的阉割版 继承了jquery的dom选择器 相比jquery非常非常的轻 但和jquery还是有不一样的地方 所以整个团队都必须要学会zepto