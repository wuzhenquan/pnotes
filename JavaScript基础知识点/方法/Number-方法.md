<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>
	
## 数字

#### number.toExponential(fractionDigits)
> 把number转换成指数形式的字符串

	var number=588888888;
	number.toExponential(2);
	// 结果返回 "5.889e+8"的字符串


#### number.toFixed(fractionDigits)
> 把number转换成十进制的字符串
	
	Math.PI.toFixed(3);//"3.142"(四舍五入)字符串
	var number=4.2365
	number.toFixed(2);//"4.24"(四舍五入)字符串
	
#### number.toPrecision(precision)
> 同样是把number转换成十进制的字符串, 不同的是参数

	Math.PI.toPrecision(3);//"3.14"(四舍五入)字符串
	var number=4.2365;
	number.toPrecision(2);//"4.2"(四舍五入)字符串
	
#### number.toString(radix)
> 把number转换成字符串 参数radix表示转换为多少进制
	
	var number=15;
	number.toString(2)//"1111"
	number.toString(16)//"a"

### isNaN()

	isNaN(NaN)//true


