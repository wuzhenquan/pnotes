<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>

## JS中面向对象的继承

### 原型链

JS中的继承主要是通过原型链来实现的

基本模式:

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
	
**注意:** 先给SubType继承SuperType, 再给SubType添加新方法.

关于`SubType.prototype = new SuperType()`的作用:

- 通过原型继承的方式让引用类型SubType()继承引用类型SuperType()
- 相当于给SubType换了一个新原型
- 此时SubType的原型对象将包含一个指向SuperType原型对象的指针(`SubType.prototype.__proto__`===`SuperType.prototype`)
- 于是通过SubType实例化的对象便有了父对象SuperType的属性和方法


**最终结果:** 

- instance指向SubType的原型, `instance.__proto__`→`SubType.prototype`
- SubType又指向SuperType的原型, `SubType.prototype.__ptoto__`→`SuperType.prototype`

---

所谓**原型链**, 就是子引用类型继承了父引用类型. 这种继承是通过原型的方法, 让父引用类型的实例赋值给子引用类型的原型对象(prototype)实现的. 通过这种方法层层继承, 就构成了原型与实例的链条.

上图:

![](http://i13.tietuku.com/1de7b593fc3a1c56.jpg)


#### 小结:

所有函数的默认原型都是Object的实例. SubType继承了SuperType, 而SuperType继承了Object. 当调用了instance.toString()时, 实际上都调用的都是保存在Object.prototype中的那个方法.

















