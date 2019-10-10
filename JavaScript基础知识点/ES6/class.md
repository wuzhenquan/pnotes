#### constructor 

就是 ES5 中的构造函数

#### super

- 当作函数用
  - 相当于 `A.prototype.constructor.call(this, props)`
  - 调用父类的构造函数
  - 内部的 this 指向子类
- 当作对象用
  - 调用父类的方法. `super.c.call(this)` 相当于 `A.prototype.c.call(this)`
  - 不只是在 `constructor` 里能用.
  - 赋值的属性会变成子类实例的属性

- 子类的构造函数必须执行一次 super, 而且还是显式的.

#### static

- 表示该方法不会被实例获取(静态方法)
- 静态方法可以与非静态方法重名
- 父类的静态方法，可以被子类继承

#### 继承

```js
class Point (){
	construction(){
		this.x = x;
		this.y = y;
	}
	
	toString(){
		return `(${this.x},${this.y})`
	}
}
class ColorPoint extends Point {
	constructor(x, y, color) {
		super(x, y); //  调用父类的 constructor(x, y)
		this.color = color;
	}
	toString() {
		return this.color + ' ' + super.toString(); //  调用父类的 toString()
	}
}
```

子类必须在 `constructor` 方法中调用 `super` 方法， 否则新建实例时会报错。 这是因为子类没有自己的`this`对象， 而是继承父类的`this`对象， 然后对其进行加工。 如果不调用 `super` 方法， 子类就得不到`this`对象。只有super方法才能返回父类实例。

ref:

https://www.jianshu.com/p/fc79756b1dc0

[http://hjaiim.github.io/2018/07/05/ES5%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0&&ES6class/](http://hjaiim.github.io/2018/07/05/ES5构造函数&&ES6class/)

