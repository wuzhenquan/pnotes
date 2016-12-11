### JavaScript 数组
- 新建一个二维数组
- 导出一个二维数组
- 给数组赋值的时候前面不要加 var

#### 对象添加/删除事件处理程

	var btn3=document.getElementById("btn3");	
	btn3.addEventListener("click", 函数名, false);//添加事件
	btn3.removeEventListener("click", 函数名, false);//删除刚才添加的事件
	//false表示不在捕获阶段处理，一般来说冒泡处理在各浏览器中兼容性较好
	//这种方法的好处:更直接，也最简便


#### 同步/异步/并发

- *同步*: 相互独立的任务一个接着一个运行(一个人做饭)
- *异步*: 把一个大任务拆分成相对独立小任务，让更加专业的人完成这个小任务，小任务完成后最后汇总成一个大任务的结果，ajax就是这样的道理(再叫另一个人洗菜切菜)
- *并发*: 让一系列独立的任务同时执行, 同时执行包含两种情形，一种就是完全独立执行，例如在拥有双核处理器的计算机里，每个CPU在同一个时间里处理不同的任务，另一种情形是一个任务还没执行完，而CPU计算被闲置的时候CPU用来处理别的任务。(和食堂打饭是一个道理)

#### window对象

- 假设a是一个还不知道值的变量, 强制让a=0的方法:`if(!a) a=0;`有必要这样吗, 为什么不直接`a=0`?

#### function(){})()等函数的详细解释

`function my(){}()` 这样写是会报错的, 要么`my()`这样调用要么用()包括起来`(function my(){})()`,其实这个 函数名 my已经没有意义了，去掉就成了匿名函数，仍然可以自动执行函数体内代码


`(function(){})();`: 立即执行函数；相当于先申明一个函数，声明完后直接调用；

`(function(){}());`: 同上

`$(document).ready(function(){});`: jquery版本的页面加载后执行

`$(function(){})`: `$(document).ready(function(){});`的简写

示例: `(function(x){return function(y){return function(z){alert(123);return x+y+z;}}}(1)(2)(3));`

#### API
文档位置和尺寸

- 设备宽度`screen.width/height`

- 窗口尺寸`window.innerWidth/innerHeight`

- 滚动尺寸`window.pageXOffset/window.pageYOffset`

- 度量viewport`document.documentElement.clientWidth/clientHeight`

  - 事件中的坐标`pageX/Y, clientX/Y, screenX/Y`90%会用到pageX/Y

- 如果不懂,请参考[viewport的故事](http://blog.jobbole.com/44319/)

window.onload = function(){}

`replace`

`parseInt`

## 随记
- `-=`左右两边只能用变量不能用数字
- parseInt 将`90px`变成90 或者用`带px单位的变量.replace("px","")`
- `document.getElementById("div").id/className`可以打印出id/className名
- 用getElementsByClassName("divclass")[0]的适合记得加索引, 即使className只有一个
- 阻止冒泡 e.stopPropagation();
- Math.round()
- 在循环里面注册没有被立即调用的函数, 闭包的时候那就要尤为注意了
- `Array.prototype.push.apply(arr1, arr2);`和`arr1.push(...arr2);`, 前者是 ES5 的写法, 后者是 ES6 的写法. 很明显 ES6 的写法更简洁
