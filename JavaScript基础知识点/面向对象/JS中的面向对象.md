<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>
## JavaScript中的面向对象

> 面向对象都有一个类的概念, 通过类可以创建任意多个具有相同**属性**和**方法**的对象.

### 简单地创建JavaScript对象

对象字面量的方式创建JavaScript对象

	var person = {
		name: "Jane", //属性
		age: 18,  //属性
		sayName: function(){alert(this.name)} //方法
	}
	
构造函数的方式创建JavaScript对象

	var person = new Object(); 
	person.name = "Jane"; //属性
	person.age = 18; //属性
	person.sayName =  function(){alert(this.name);}; //属性

> 通过构造函数或对象字面量创建对象的缺点不言而喻了----使用一个接口创建很多对象会产生大量重复代码. 

### 一些概念

在了解JavaScript的面向对象设计模式之前, 需要些了解几个概念

- **引用类型**和**"类"**
	- 引用类型是一种**数据结构**, 用于将**数据**和**功能**组织在一起
	- 引用类型常被称为类(在《JS权威指南》中引用类型被称为类) , 但并不妥当 
	- ES不具备传统的面向对象所支持的类和借口等基本结构
	- 引用类型也被称为对象定义
	
- **构造函数**
	- 构造函数是专门用来生成对象的函数
	- new运算符创建并初始化一个新的对象实例, 后面跟随一个函数调用, 这个函数称作构造函数----《JS权威指南》P120
	- 调用构造函数的一个重要特征是, 构造函数的**prototype**属性被用作新对象的原型
	- 定义了构造函数, 就是定义了一个引用类型
	- 构造函数的函数名首字母大写
	
- **原型对象**
	- 原型对象作为一个母体, 其属性被子对象所继承
	- 每个构造函数都有一个对应的原型对象
	- 每创建一个新函数, 这个新函数就有一个**prototype**属性, 这个属性**指向**原型对象
	- 原型对象有一个**constructor**属性(constructor指得就是构造函数)
	- 实例化的对象有一个指针`[[prototype]]`, 指向原型对象.
	- `[[prototype]]`是**不可访问**的, 在chrome里, 用`__proto__`可以访问得到


![构造函数, 原型对象, 实例之间的关系](http://i13.tietuku.com/dcf9d893a46043d0.png)

### 面向对象的设计模式

**工厂模式**的缺点: 没有解决对象识别的问题, 不能将它的实例标识为一种特定的类型

**构造函数模式**的缺点: 但构造函数中每个方法都要在每个实例上重新创建一遍. 

**原型模式**的缺点: 对于包含引用类型的属性来说, 会被所有实例共享. 

**寄生构造函数模式**的缺点: 返回的对象与构造函数之间没有关系(用instanceof结果返回false)

**稳妥构造函数模式**的优点: 安全. 



---

##### 组合使用构造函数模式和原型模式

> 目前在ECMA中使用最广泛, 认同度最高的一种创建自定义类型的方法. 

构造函数模式用于定义实例属性, 原型模式用于定义方法和共享的属性

优点: 每个实例都会有自己的一份实例属性的副本, 但同时又共享着对方法的引用, 最大限度的节省了内存.

	
	// 构造函数模式
	function Person(name, age, job){
		this.name = name;
		this.age = age;
		this.job = job;
		this.friends = ["Shelby", "Court"];
	}
	// 原型模式
	// 使用对象字面量重写原型时
    // 要在重写的原型里面添加constructor属性和对应的属性值
    // 不然constructor属性不再指向原来的构造函数
	Person.prototype = {
		constructor: Person,
		sayName: function(){alert(this.name);}
	}

	var person1 = new Person("Nicholas", 29, "Sofrware Engineer");
	var person2 = new Person("Greg", 27, "Doctor");
	
	person1.friends.push("Van")
	
	console.log(person1.friends); // ["Shelby", "Court", "Van"]
	console.log(person2.friends); // ["Shelby", "Court"]
	
在这个例子中, 实例属性都是在构造函数中定义的, 而由所有实例共享的属性constructor和方法sayName()则是在原型中定义的.修改了person1.friends并不会影响到person2.friends

##### 动态原型模式

> 非常完美
	
	function Person(name, age, job){
		// 属性
		this.name = name;
		this.age = age;
		this.job = job;
		// 方法
		// 在sayName方法不存在的情况下, 才会将它添加到原型中, 完美
		if(typeof this.sayName != "function"){
			Person.prototype.sayName = function(){
				alert(this.name);
			};
		}
	}	
		
	var friend = new Person("Nicholas", 29, "Software Engineer");
	friend.sayName();	// "Nicholas"		
---

### 属性类型

> 属性类型指的是JavaScript对象中的属性有不同的特性(可写性, 可配置性, 可枚举性), 一个属性不仅可以设置它的值, 还能设置这个属性是否可写, 是否可配置, 是否可枚举

在定义一个对象时, 默认的可写性, 可配置性, 可枚举性都是设置为true

	var person = {name: "Nicholas"} // 可以试试
	
在定义一个对象并且用Object.defineProperty()时, 默认的可写性, 可配置性, 可枚举性都是设置为false

	var person = {};
	Object.defineProperty(person, "name", {
		value: "Nicholas",		
	}); // 可以试试

##### 改变数据属性

> 改变数据的值, 可写性, 可配置性, 可枚举性(能否使用for-in). 默认值都是true

	var person = {};
	Object.defineProperty(person, "name", {
		value: "Nicholas",		
		writable: false,        // 让person.name不能改
		configurable: false		// 让person.name不能删
	});
	
	person.name;
