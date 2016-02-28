<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>

在[segmentfault](segmentfalut.com)上看到一个[关于this作用域的笔试题](https://segmentfault.com/q/1010000004499240)

代码如下:

	var number=2;
	var obj={
	   number:4,
	   fn1:(function(){ // 匿名函数1
	           var number;
	           this.number*=2;//全局变量number变为4 语句(1)
	           number=number*2;//NaN 语句(2)
	           number=3;
	           return function(){ // 匿名函数(2)
	                 var num=this.number;
	                 this.number*=2;
	                 console.log(num);
	                 number*=3;
	                 alert(number);
	           }
	    })(),
	    db2:function(){
	        this.number*=2;
	    }
	}
	var fn1=obj.fn1; // 		 语句(3)
	alert(window.number);// 返回4		 语句(4)
	fn1();// 返回9				 语句(5)
	obj.fn1();// 返回27			 语句(6)
	alert(window.number);// 返回8
	alert(obj.number);// 返回8

首先, `alert(window.number)`的效果相当于`alert(number)`

当定义obj的时候执行了匿名函数1
