<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>

### JS对象的属性类型

> 对象的属性类型指的是JavaScript对象中的属性有不同的特性(可写性, 可配置性, 可枚举性), 一个属性不仅可以设置它的值, 还能设置这个属性是否可写, 是否可配置, 是否可枚举

对象的属性类型有**数据属性**和**访问器属性**


在定义一个对象时, 默认的可写性, 可配置性, 可枚举性都是设置为true

	var person = {name: "Nicholas"} // 可以试试
	
在定义一个对象并且用Object.defineProperty()时, 默认的可写性, 可配置性, 可枚举性都是设置为false

	var person = {};
	Object.defineProperty(person, "name", {
		value: "Nicholas",		
	}); // 可以试试

##### 数据属性

> 改变数据的值, 可写性, 可配置性, 可枚举性(能否使用for-in). 

示例代码: 

	var person = {};
	Object.defineProperty(person, "name", {
		value: "Nicholas",		
		writable: false,        // 让person.name不能改
		configurable: false		// 让person.name不能删
	});
	
	person.name;               // "Nicholas"
	delete person.name;			// false
	person.name = "eason";		// 改不了
	
	
##### 访问器属性

> 访问对象属性(读取和写入对象属性)时的特性

- `get: function(){}`设置对象属性被访问时所调用的方法
- `set: function(){}`设置对象属性被写入时所调用的方法

示例代码:

	var book = {
		_year: 2004,
		edition: 1
	};
	// 设置book.year的访问器属性
	Object.defineProperty(book, "year", {
	// 当book.year被调用时返回book._year
		get: function(){
			return this._year;
		},
	// 当book.year被写入时
		set: function(newValue){
			if (newValue) {
				this._year = newValue;
				this.edition += newValue - 2004;
			}
		}
	});