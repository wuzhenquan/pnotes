<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>

## JS中面向对象的继承

### 原型链继承模式

JS中的继承主要是通过原型链来实现的

所谓**原型链**, 就是子引用类型继承了父引用类型. 这种继承是通过原型的方法, 让父引用类型的实例赋值给子引用类型的原型对象(prototype)实现的. 通过这种方法层层继承, 就构成了原型与实例的链条.

上图:

![](http://i13.tietuku.com/1de7b593fc3a1c56.jpg)

例01:

	function SuperType(){
		this.property = true;
	}
	
	SuperType.prototype.getSuperValue = function(){
		return this.property;
	};
	
	function SubType(){
		this.subproperty = false;
	}
	
	// SubTyp继承SuperType
	// 使得SubType有了SuperType的属性和方法
	SubType.prototype = new SuperType();
	
	// 继承之后再给SubType.prototype添加一个方法
	// 这样就在继承SuperType的属性和方法的基础上又添加了一个新方法
	SubType.prototype.getSubValue = function(){
		return this.subproperty;
	}
	
	var instance = new SubType();
	instance.getSubValue();		// false
	instance.getSuperValue();	// true
	
	// 注意: 先给SubType继承SuperType, 再给SubType添加新方法.


`SubType.prototype = new SuperType()`的作用:

- 通过原型继承的方式让引用类型SubType()继承引用类型SuperType()
- 相当于给SubType换了一个新原型
- 此时SubType的原型对象将包含一个指向SuperType原型对象的指针(`SubType.prototype.__proto__`===`SuperType.prototype`)
- 于是通过SubType实例化的对象便有了父对象SuperType的属性和方法


**最终结果:** 

- instance指向SubType的原型, `instance.__proto__`→`SubType.prototype`
- SubType又指向SuperType的原型, `SubType.prototype.__ptoto__`→`SuperType.prototype`

**确定原型和实例的关系**

- 第一种方法 用操作符instanceof
- 第二种方法 用方法isPrototypeOf()

**使用原型链实现继承要注意以下几点:**

- 给原型添加方法的代码一定要放在替换原型的语句之后(《JS高程》P165)
- 继承后所有实例被共享
- 创建子类型的实例时, 不能向超类型的构造函数中传递参数.

**原型链的问题**

- 所有实例会共享属性
- 不能向超类型的构造函数中传递参数

例02:

	function SuperType(){
		this.colors = ["red", "blue", "green"]
	}
	function SubType(){}
	// 让SubTYpe继承SuperType
	SubType.prototype = new SuperType();
	var instance1 = new SubType();
	var instance2 = new SupType();
	instance1.colors.push("black");
	
上述代码中的实例instance1和instance2的colors都为`["red", "blue", "green", "black"]`. 说明了当属性值为引用类型时调用引用类型的方法的话,实例会共享属性这一问题.

##### 小结

所有函数的默认原型都是Object的实例. SubType继承了SuperType, 而SuperType继承了Object. 当调用了instance.toString()时, 实际上都调用的都是保存在Object.prototype中的那个方法.因为通过原型链继承所产生的问题**实践中很少会单独使用原型链继承**

**实践中很少会单独使用原型链**

### 借用构造函数继承模式

使用apply()或call()方法, 把上例01中的`SubType.prototype = new SuperType();`改成`function SubType(){SuperType.call(this)}`, 就是**借用构造函数**继承原型的方法了. 

借用构造函数可以解决原型链继承中的所有问题了

但借用函数本身会有一个问题, 方法都在构造函数中定义, 因此函数复用就无从谈起了. 

### 原型模式和借用构造模式组合继承模式

> 组合继承模式避免了原型链和借用构造函数的缺陷, 融合了他们的优点, 成为JavaScript中最常用的继承模式.也能用用instanceof和isPrototypeOf()识别基于组合继承创建的对象

**借用构造函数继承属性, 原型模式继承方法**

例3:
	
	function SuperType(name){
		this.name = name;
		this.colors = ["red", "blue", "green"];
	}
	
	SuperType.prototype.sayName = function(){
		alert(this.name);
	}
	
	function SubType(name, age){
		//借用构造模式继承属性
		SuperType.call(this, name);
		this.age = age;
	}
	
	// 原型模式继承方法
	SubType.prototype = new SuperType();
	SubType.prototype.constructor = SubType;
	SubType.prototype.sayAge = function(){
		alert(this.age);
	}
	
	var instance1 = new SubType("Nicholas", 29);
	instance1.colors.push("black");
	instance1.colors; //
	instance1.sayName();
	instance1.sayAge();
	
	var instance2 = new SubType("Greg", 27)
	instance2.colors2;
	instance2.sayName();
	instance2.sayAge();
	
组合式继承的缺点是无论什么情况下, 都会调用两次超类型构造函数, 一次是在创建子类型原型的时候, 另一次是在子类型构造函数内部. 

### 原型式继承模式

> 在只想让一个对象与另一个对象保持类似的情况下, 原型式是完全可以继承的.

	var person = {
		name: "Nicholas",
		friends: ["Shelby", "Court", "Van"]
	}
	
	// object()已抛弃 现在用Object.create(), 两者并无它异
	// 用Object.create()的方式继承
	var Person1 = Object.create(person);
	Person1.name = "Greg";
	Person1.friends.push("Rob");
	
	var Person2 = Object.create(person);
	Person2.name = "Linda";
	Person2.friends.push("Barbie");
	
	person.friends;

不过, 包含引用类型的值的属性始终都会共享相应的值, 就像使用原型模式一样. 

没有必要兴师动众的用构造函数继承原型链继承, 下面看看如何叫做兴师动众
	
	function Person(){
		this.name="Nicholas";
		this.friends = ["Shelby","Court", "Van"];
	}
	
	function Person1(){};
	Person1.prototype = new Person();
		
	var person1 = new Person1();
	person1.name = "Greg";
	person1.friends.push("Rob");
	
	var person2 = new Person1();
	person2.name = "Linda";
	person2.friends.push("Barbie");
	// 这样哪算兴师动众啊
	
### 寄生式继承模式

	function createAnother(original){
		var clone = Object.create(original);
		clone.sayHi = function(){
			console.log("hi")
		}
		return clone;
	}
	
	var person = {
		name: "Nicholas",
		firends: ["Shelby", "Court", "Van"]
	}
	
	var	person1 = createAnother(person);
	person1.sayHi();

寄生构造函数适合用于主要考虑对象而不是自定义类型和构造函数的情况

缺点是使用寄生式继承来为对象添加函数, 会由于不能做到函数复用而降低效率; 与构造函数类似.

### 寄生组合式继承模式

> 寄生组合式构造函数解决原型借用组合模式继承的缺点--总是会调用两次超类型构造函数.

寄生组合式继承, 通过**寄生式来继承超类型的副本**, 通过**借用构造函数来继承属性**, 通过**原型链来继承方法**. 不必为了指定子类型的原型而调用超类型的构造函数, 我们所需要的无非就是超类型原型(SuperType)的一个副本而已.

寄生组合式继承的基本模式如下:
	
	// 寄生式继承超类型的副本
	function inheritPrototype(subType, superType){
		// 创建超类型原型的一个副本
		var prototype = Object.create(superType.prototype); // 创建对象
		// 为创建的副本添加constructor属性
		prototype.constructor = subType;		      // 增强对象
		// 将新创建的对象赋值给子类型的原型
		subType.prototype = prototype;               // 指定对象
	}
	
	function SuperType(name){
		this.name = name;
		this.colors = ["red", "blue", "green"];
	}

	SuperType.prototype.sayName = function(){
		console.log(this.name);
	}
	// 借用构造函数继承属性
	function SubType(name, age){
		SuperType.call(this, name);
		this.age = age;
	}
	// 通过调用inheritPrototype()函数,
	inheritPrototype(SubType, SuperType);
	// 通过原型链继承方法
	SubType.prototype.sayAge = function(){
		console.log(this.age);
	}

优点:
	
- 高效率
	- 只调用了一次SuperType构造函数
	- 避免了在SubType.prototype上面创建不必要的, 多余的属性
- 能正常的使用`instanceof`和`isPrototypeOf()`







