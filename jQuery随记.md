##jQuery的API新大陆
- `next()`
- `index()`
- `eq()`
- `each()`
- `filter()`

## 易忘代码
- `$(function(){})`相当于javascript的`window.onload`吗
  `$(document)`而不是`$("#document")`-_-
- $('span', this)等同于$(this).find('span')
- `$(document).on('click', 'selecor', function(e) {}`的好处就是使`append`生成的代码也会响应事件, 具体可以看[stackoverflow](http://stackoverflow.com/questions/18196185/jquery-click-event-doesnt-work-after-append-dont-know-how-to-use-on)
- siblings()很好用, 返回的是同一级的所有dom元素

