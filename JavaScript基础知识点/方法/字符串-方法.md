<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>

## 字符串
	
#### string.charAt(pos)
> 返回在string中处于pos位置的字符 

	"abcde".charAt(2);//"c"

#### string.charCodeAt(pos)	
> 返回在string中处于pos位置的字符码位

	"abcde".charCodeAt(2);//99
	
#### string.concat(string...)
> 连接字符串 很少被使用 直接用"+"就可以连接字符串了

	"abcde".concat("fg","hi")// "abcdefghi"


#### string.indexOf(searchingString, position)
> 查找匹配字符串(从左向右 position开始算起) 返回第一个匹配的位置 找不到的话就返回 -1

	var text='Mississippi';
	text.indexOf('ss');   // 返回2
	text.indexOf('ss',3); // 返回5
	text.indexOf('ss',6); // 返回-1

#### string.lastIndexOf(searchingString, position)
> 查找匹配字符串(从右向左 position开始算起) 返回第一个匹配的位置 找不到的话就返回 -1

	var text='Mississippi';
	text.lastIndexOf('ss');   // 返回5
	text.lastIndexOf('ss',3); // 返回2
	text.lastIndexOf('ss',5); // 返回-1

#### string.localeCompare(that)
> 比较字符串 string比that小返回-1  相等返回0  string比that大返回1

	var m=['AAA','A','aa','a','Aa','aaa'];
	m.sort(function(a,b){
		return a.localeCompare(b)
	})
	//m变成了["a", "A", "aa", "Aa", "aaa", "AAA"]

#### string.match(regexp)
> 让字符串和正则表达式匹配 我现在还不会正则表达式→_→

#### string.replace(searchValue, replaceValue)
> 查找和替换string 并返回一个新字符串 又涉及到正则表达式 我还是不会啊→_→

#string.search(regexp)
> 涉及到正则表达 我不会→_→

#### string.slice(start, end)
> 复制string的一部分 start,end如果是负数将与length相加(也就是逆序的意思)

	var text='and in it he says "Any damn fool could"';
	text.slice(18);//'"Any damn fool could"';
	text.slice(0,3);//'and'
	text.slice(-5);//'could'
	text.slice(19,32)//'Any damn fool'
	
#### string.substring(start, end)
> 和slice一样, 只是不能处理负数参数, 不要使用substring了

#### string.split(separator, limit)
> 将string分割成片段并返回数组 separator: 字符或表达式 limit:可选 限制被分割的片段数量

	'0123456789'.split('',5);// ['0','1','2','3','4']
	
	'192.168.1.0'.split('.');// ["192", "168", "1", "0"]
	
	'|a|b|c|'.split('|');//["", "a", "b", "c", ""]
	
	'last,first,middle'.split(/\s*,\s*/);//["last", "first", "middle"]
	
	'last,first,middle'.split(/\s*(,)\s*/);//["last", "first", "middle"]
	
	//

#### string.toLowerCase()
> 转换为小写

#### string.toUpperCase()
> 转换为大写



