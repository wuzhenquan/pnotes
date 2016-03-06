<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>

在[segmentfault](segmentfalut.com)上看到一个[关于this作用域的笔试题](https://segmentfault.com/q/1010000004499240)

对这道笔试题, 如果脑中有清晰的解答流程, 说明对this和作用域掌握的还不错了

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
	var fn1=obj.fn1; // 			 语句(3)
	alert(window.number);// 返回4		 语句(4)
	fn1();// 返回9					 语句(5)
	obj.fn1();// 返回27				 语句(6)
	alert(window.number);// 返回8
	alert(obj.number);// 返回8

首先, `alert(window.number)`的效果相当于`alert(number)`

- 当定义obj的时候执行了匿名函数(1)
	- 执行语句(1), 全局作用域的window.number为4;
	- 执行完语句(2), 临时变量number为NaN, 随后被赋值, 临时变量变为3;
	- 返回匿名函数(2); 
	- 匿名函数(2)会用到临时变量number, 产生闭包;
- 执行语句(3), 此时fn1 = 匿名函数(2);
- 执行语句(4), 全局变量已经变为4了, 所以此时返回的值为4;
- 执行语句(5), 注意全局作用域number此时为4, 此时是在window对象在执行这个函数fn1
	- num为4
	- this.number 为 8, 此时this.number就是window.number, window.number为8
	- number返回9(由于闭包, number会一直保存到, 不会被垃圾回收)
- 执行语句(6), 注意全局变量number此时变为8, 此时是obj对象在执行这个函数fn1, obj.number为4, number为9(之前闭包保存了number)
	- num为4;
	- this.number为8, 此时this.number就是obj.number, obj.number为8;
	- number为27;
	
值得注意的是, 这里有闭包







