参考链接:
[详解JS类概念的实现](https://segmentfault.com/a/1190000004700001)

下面是最普通的构造函数及其实例化的代码

	function Dog(name){
	  this.name = name;
	  this.bark = function(){
	    console.log(this.name + " bark");
	  };
	}
	var d1 = new Dog("dodo");
	d1.bark();

这是最容易的面向对象的实现方法. 不推荐这么做，因为每次实例化时，都会执行Dog这个函数，bark 这个方法每次都会被定义, 浪费内存.

可以再原型对象上定义此方法

	function Dog(name) {
        this.name = name;
    }
    Dog.prototype = {
        bark: function() {
            console.log(this.name + " bark");
        }
    };
    var d1 = new Dog("dodo");
    Dog.prototype.run = function() {
            console.log(this.name + " is running!");
        }

两个好处:

1. 方便定义方法, 直接`Dog.prototype.run = function(){}`
2. 实例化后, 仍可对原型添加方法(比如这个run), 已经被示例化后的示例就可以使用这个刚添加的方法

**类的继承是通过原型链继承的**

看下面一段代码

哈士奇Haski继承了Dog

	function Dog(name){
	  this.name = name;
	}
	
	// 这种写法会修改dog实例的constructor，可以通过Dog.prototype.constructor = Dog来重置
	Dog.prototype = {
	  bark: function(){
	    console.log(this.name + " bark");
	  }
	};
	
	// 重置Dog实例的构造函数为本身
	Dog.prototype.constructor = Dog;
	
	// Haski 的构造函数
	function Haski(name){
	  // 继承Dog的构造函数
	  Dog.call(this, name);
	  // 可以补充更多Haski的属性
	  this.type = "Haski";
	};
	
	// 1. 设置Haski的prototype为Dog的实例对象
	// 2. 此时Haski的原型链是 Haski -> Dog的实例 -> Dog -> Object
	// 3. 此时，Haski包含了Dog的所有属性和方法，而且还有一个指针，指向Dog的原型对象
	// 4. 这种做法是不推荐的，下面会改进
	Haski.prototype = new Dog();
	
	// 重置Haski实例的构造函数为本身
	Haski.prototype.constructor = Haski;
	
	// 可以为子类添加更多的方法
	Haski.prototype.say = function(){
	  console.log("I'm " + this.name);
	}
	
	var ha = new Haski("Ha");
	// Ha bark
	ha.bark();
	// Ha bark
	ha.say();
	// I'm Ha

修改一下代码, 去掉`ha.__proto__中`的`Dog {name: undefined}`的name属性, 因为name总是undefined所以没必要留了

出现`Dog {name: undefined}`的原因

因为在`Haski.prototype = new Dog();`时构造函数`function Dog(name){this.name = name;}`需要执行`this.name = name;`, 而`new Dog()`中没有传人参数, 每次`new Dog()`都会再这个实例上有一个未定义的name

	// 修改前
	Haski.prototype = new Dog();
	
	// 修改后
	Haski.prototype = Object.create(Dog.prototype);

> 注: __proto__ 方法已弃用，从 ECMAScript 6 开始, [[Prototype]] 可以用Object.getPrototypeOf()和Object.setPrototypeOf()访问器来访问

往下还有ES6的方法, 因为不懂, 就不写了