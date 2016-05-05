<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>


## 数组的方法

##### array.concat(item...)

	var number1=['one','two','three','four','five']
	var number2=['six','seven']
	number1.concat(number2,'eight','night',10)
	// 结果返回["one", "two", "three", "four", "five", "six", "seven", "eight", "night", 10]
	// 但number1仍然是['one','two','three','four','five']

##### array.join(seprator)

	var a=['a','b','c'];
	a.join('')
	// 返回结果为'abc'
	// 建议不用这个, 改用+元素运算符, 性能高于Array.join()

##### array.push(item...)

	var number=['one','two','three','four','five']
	number.push('six','seven');
	// 数组结果var number=['one','two','three','four','five','six','seven']

##### unshift(item...)

	var number=['one','two','three','four','five']
	number.unshift('six','seven');
	// 数组结果var number=["six", "seven", "one", "two", "three", "four", "five"]

##### array.shift()

	var number=['one','two','three','four','five']
	var c=number.shift();
	// 现在c是'one', number是['two','three','four','five']

##### array.pop()

	var number=['one','two','three','four','five']
	var c=number.pop()
	//现在c是'five', number是['one','two','three','four']

##### array.reverse()

	var number=['one','two','three','four','five']
	number.reverse()
	//数组结果number=["five", "four", "three", "two", "one"]




##### delete array[i]

	var number=['one','two','three','four','five']
	delete number[2]
	// 数组结果number=['one','two',undefined,'four','five','six']

##### array.slice(start, end)	

	var number=['one','two','three','four','five'];
	number.slice(2,4)
	// 摘取数组中的片段 2代表起始位置, 4代表复制的个数
	// 返回值var number=['three','four']
	// 但number仍然是['one','two','three','four','five'];

##### array.splice(start, deleteCount, item)

	var number=['one','two','three','four','five']
	number.splice(2,3) //2代表索引位置 3代表删除的个数
	// 数组结果var number=['one','two']
	
	number.splice(2,3,'six','seven') 
	//'six','seven'替换删掉的这3个元素
	// 数组结果var number=['one','two','three']

##### array.sort(comparefn)

> 按字符编码顺序排序 数字不能正确排序


```javascript
var n=[4,8,15,16,23,42];
n.sort();
// n的结果为[15,16,23,4,42,8];

// 数字排序
n.sort(function(a,b){ // 参数a是array[i],参数b是array[i+1]
	return a-b;
})
// 此时n为n=[4, 8, 15, 16, 23, 42]

// 数字和字符串排序
var m=['aa','bb','a',4,8,15,16,23,42]
m.sort(function(a.b){
	if(a===b){
		return 0;
	}
	//同类型的进行排序
	if(typeof a === typeof b){
		return a < b ? -1 : 1;
	}
	//把数字放前面
	return typeof a < typeof b ? -1 : 1;
})
```

##### array.map(callback[, thisArg])

[MDN Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```javascript
var number=['one','two','three','four','five']
var aaa=number.map(function(aaa){return aaa+'quan'});
console.log(aaa); // ["onequan", "twoquan", "threequan", "fourquan", "fivequan"]
```


##### for in

> 用for in遍历数组的所有属性无法保证属性的顺序

