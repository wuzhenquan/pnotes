### JS对象的属性类型

> 对象的属性类型指的是JavaScript对象中的属性有不同的特性(可写性, 可配置性, 可枚举性), 一个属性不仅可以设置它的值, 还能设置这个属性是否可写, 是否可配置, 是否可枚举

对象的属性类型有**数据属性**和**访问器属性**


在定义一个对象时, 默认的可写性, 可配置性, 可枚举性都是设置为true

```javascript
var person = {name: "Nicholas"} // 可以试试
```

在定义一个对象并且用Object.defineProperty()时, 默认的可写性, 可配置性, 可枚举性都是设置为false

```javascript
var person = {};
Object.defineProperty(person, "name", {
	value: "Nicholas",		
}); // 可以试试
person.name;  // "Nicholas" 可读
person.name = "Jay";// 不会报错, 但是再次执行person.name时, 名字还是原来的
```

##### 数据属性

> 改变数据的值, 可写性, 可配置性, 可枚举性(能否使用for-in), 用 `Object.defineProperty() `方法. 

示例代码: 

```javascript
var person = {};
Object.defineProperty(person, "name", {
	value: "Nicholas",		
	writable: false,        // 让person.name不能改
	configurable: false		// 让person.name不能删
});

person.name;               // "Nicholas"
delete person.name;			// false
person.name = "eason";		// 改不了
```

##### 访问器属性

> 在读取访问器属性时, 会调用 getter 函数; 在写入访问器属性时, 会调用 setter 函数; 

- `get: function(){}`设置对象属性被访问时所调用的方法
- `set: function(){}`设置对象属性被写入时所调用的方法

注意

- getter方法没有参数
- setter方法必须有一个参数, 该参数为要设置的属性的新值. 

示例代码:

```javascript
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
book.year = 2005;
alert(book.edition); // 2
```
