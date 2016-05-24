

## 字符串

#### string.charAt(pos)
> 返回在string中处于pos位置的字符 

```javascript
"abcde".charAt(2);//"c"
```

#### string.charCodeAt(pos)	
> 返回在string中处于pos位置的字符码位

```javascript
"abcde".charCodeAt(2);//99
```

#### string.concat(string...)
> 连接字符串 很少被使用 直接用"+"就可以连接字符串了

```javascript
"abcde".concat("fg","hi")// "abcdefghi"
```


#### string.indexOf(searchingString, position)
> 查找匹配字符串(从左向右 position开始算起) 返回第一个匹配的位置 找不到的话就返回 -1

```javascript
var text='Mississippi';
text.indexOf('ss');   // 返回2
text.indexOf('ss',3); // 返回5
text.indexOf('ss',6); // 返回-1
```

#### string.lastIndexOf(searchingString, position)
> 查找匹配字符串(从右向左 position开始算起) 返回第一个匹配的位置 找不到的话就返回 -1

```javascript
var text='Mississippi';
text.lastIndexOf('ss');   // 返回5
text.lastIndexOf('ss',3); // 返回2
text.lastIndexOf('ss',5); // 返回-1
```

#### string.localeCompare(that)
> 比较字符串 string 比 that 小返回-1  相等返回0  string比that大返回1

```javascript
var m=['AAA','A','aa','a','Aa','aaa'];
m.sort(function(a,b){
	return a.localeCompare(b)
})
//m变成了["a", "A", "aa", "Aa", "aaa", "AAA"]
```

#### string.match(regexp)
> 让字符串和正则表达式匹配 . 它依据 g 标识符来决定如何进行匹配, 如果没有 g 标识, 那么调用 string.match( regxp )的结果与调用 regexp.exec( string )的结果相同. 如果有 g 标识, 那么它生成一个包含所有匹配(除捕获分组之外)的数组

```javascript
var text = '<html><body bgcolor=linen><p>' + 
    	'This is <b>bold<\/b>!<\/p><\/body><\/html>';
var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
var a, i;
String.prototype.entityify = function () {
  return this.replace(/</g, "<").replace(/>/g, ">");
};
a = text.match(tags);
for (i = 0; i<a.length;i +=1){
  console.log(('// [' + i +'] ' + a[i]).entityify());
}
// 结果:
// [0] <html>
// [1] <body bgcolor=linen>
// [2] <p>
// [3] This is 
// [4] <b>
// [5] bold
// [6] </b>
// [7] !
// [8] </p>
// [9] </body>
// [10] </html>
console.log(a); 
// 结果:
//["<html>", "<body bgcolor=linen>", "<p>", "This is ", "<b>", "bold", "</b>", "!", "</p>", "</body>", "</html>"]
```

#### string.replace(searchValue, replaceValue)
> 查找和替换string 并返回一个新字符串 

```javascript
var oldareacode = /\((\d{3})\)/g;
var p = '(555)666-1212'.replace(oldareacode, '$1-');
// p 是 '555-666-1212'
```

#### string.search(regexp)
> 涉及到正则表达 

```javascript
javascript
```

#### string.slice(start, end)
> 复制string的一部分 start,end如果是负数将与length相加(也就是逆序的意思)

```javascript
var text='and in it he says "Any damn fool could"';
text.slice(18);//'"Any damn fool could"';
text.slice(0,3);//'and'
text.slice(-5);//'could'
text.slice(19,32)//'Any damn fool'
```

#### string.substring(start, end)
> 和slice一样, 只是不能处理负数参数, 不要使用substring了

#### string.split(separator, limit)
> 将string分割成片段并返回数组 separator: 字符或表达式 limit:可选 限制被分割的片段数量
```javascript
'0123456789'.split('',5);// ['0','1','2','3','4']

'192.168.1.0'.split('.');// ["192", "168", "1", "0"]

'|a|b|c|'.split('|');//["", "a", "b", "c", ""]

'last,first,middle'.split(/\s*,\s*/);//["last", "first", "middle"]

'last,first,middle'.split(/\s*(,)\s*/);//["last", "first", "middle"]
```

#### string.toLowerCase()
> 转换为小写

#### string.toUpperCase()
> 转换为大写



