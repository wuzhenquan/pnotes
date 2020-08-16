## Zepto入门
> 代码测试在Zeptojs.com里的console进行

> [zepto组件库](http://zeptojs.com/#modules)

#### $(selector.[context])
`selector`是选择器, `[context]`是上下文, 也是一个选择器, `selector`要作为[context]的子元素才能正确的选取元素

#### 选取dom节点放进$()
> 和jQuery一样

    var dom = document.getElementById('menu_icon');
    $(dom);//一样能取到节点


#### 创建一个节点
> 和jQuery一样

    $('<div>');

### 触发事件
> 和jQuery不太一样的地方

`$.Event(type, [properties])`

type表示事件的名称, 该事件可以自定义名称, 也可以使用常规的事件

    //绑定一个自定义的"abc"事件
    $(document).on('abc',function(){console.log(1)});
    //触发绑定的事件
    $(document).trigger('abc');

当然click事件可以用和jQuery一样的方法

### 触屏事件
> zepto本身不支持触屏事件, 需要引入 [touch.js插件库5.75KB](https://github.com/madrobby/zepto/blob/master/src/touch.js#files)

- `tap`
- `singleTap`和`doubleTap`: 可以再同一个元素上同时使用这两个事件, 如果不需要doubleTap事件, 可直接用tap
- `longTap`
- `swipe`, `swipeLeft`, `swipeRight`, `swipeUp`, `swipeDown`

示例代码

    $(document).bind('tap', function(){console.log(1)})


### 主要事件参考链接
- [解绑](http://zeptojs.com/#event.isDefaultPrevented)
- [阻止事件冒泡](http://zeptojs.com/#event.isPropagationStopped)

#### Ajax
[慕课网Zepto Ajax简单介绍](http://www.imooc.com/video/4766)

可以跨富域访问?什么意思?[HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

#### 插件简介

- fx.js fx_methods.js 动画效果
- defferred.js 处理异步回调的设计模式 比起用deferred来说 用callback太土了

#### [慕课网最后一节主内容 编程思想](http://www.imooc.com/video/5292)
