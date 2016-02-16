##viewport--视窗
> 在chorme Dev tools 的console内输入:

> 	document.body.clientWidth(查看布局viewport)

>	window.innerWidth(查看度量viewport)

>	window.innerWidth/document.body.clientWidth(上两者之间的比例)

###viewport参考资料
- Mozilla 开发者博客 [viewport使用教程](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)
- Apple 开发者站 [viewport 详细的描述](http://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html)
- quirksmode.org [viewport 在各个手机浏览器不同之处介绍](http://www.quirksmode.org/mobile/viewports2.html)
 
当meta标签的name属性为viewport时, content里的内容表示viewport的参数

	<meta name="viewport" content="参数">


viewport常用参数如下:

###width
 宽度（数值 / device-width）（范围从200 到10,000，
默认为980 像素）
###height
高度（数值 / device-height）（范围从223 到10,000）
> device-width/divice-heght为设备的宽度/高度

###initial-scale
初始缩放比例范围(浮点值0~10).

如果你设置初始缩放为“1.0”，那么，web页面在展现的时候就会以target density分辨率的1:1来展现。如果你设置为“2.0”，那么这个页面就会放大为2倍。

> 注意，很多人使用initial-scale=1到非响应式网站上，这会让网站以100%宽度渲染，用户需要手动移动页面或者缩放。如果和initial-scale=1同时使用user-scalable=no或maximum-scale=1，则用户将不能放大/缩小网页来看到全部的内容。

###minimum-scale
允许用户缩放到的最小比例(浮点值),用以指出页面大小与屏幕大小相比的最大乘数

###maximum-scale
允许用户缩放到的最大比例(浮点值)

###user-scalable
用户是否可以手动缩 (no,yes)

> 用了user-scalable, minium-scale和maxinum-scale都将被忽略
I
一个常用的viewport meta标签如下:

	<meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1″>
	设置屏幕宽度为设备宽度，禁止用户手动调整缩放
	
###target-densitydpi
像素密度(device-dpi/high-dpi/medium-dpi/low-dpi/数值)


dpi表示每英寸点的数量	

- device-dpi: 使用设备原本的 dpi 作为目标 dp。 不会发生默认缩放。
- high-dpi: 使用hdpi 作为目标 dpi。 中等像素密度和低像素密度设备相应缩小。
- medium-dpi: 使用mdpi作为目标 dpi。 高像素密度设备相应放大， 像素密度设备相应缩小。这是默认的target density。
- low-dpi: 使用mdpi作为目标 dpi。中等像素密度和高像素密度设备相应放大。
- `<value>`: 指定一个具体的dpi 值作为target dpi. 这个值的范围必须在70–400之间。

##一些例子
自动检测移动设备屏幕大小，然后让内容自适应

	<meta name="viewport" content="width=device-width" />

