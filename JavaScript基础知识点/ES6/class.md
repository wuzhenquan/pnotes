### class 应用

> 在 JavaScript 的现实场景中，尤其是前端代码，我们很少用到类继承，大多数时候，工厂函数就能完成我们的目标













class 只是一种语法糖

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
}
等同于
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return '(' + this.x + ',' + this.y + ')';
}
```

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
class Point{
	construction(x, y){
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

### es2019

```javascript
class MyClass {
  a = 1;
}
// 
class MyClass {
  constructor() {
    this.a = 1;
  }
}
```

```javascript
class MyClass {
  static z = 3;
}
// 等于
class MyClass {}
MyClass.z = 3;

```

```js
// 私有属性
class MyClass {
  #b = 2;         // .#b is private
  static #c = 3;  // .#c is private and static
  incB() { this.#b++; }
}
let m = new MyClass();
m.incB(); // runs OK
m.#b = 0; // error - private property cannot be modified outside class
MyClass.#c // error
```



### class 的一些缺陷

```js
class Person {
  constructor (name) {
    this.name = name
  }
  talk () {
    console.log(`${this.name} says hello`)
  }
}
const Grey = new Person('Grey')
const mockDomButton = {} // 模拟一个DOM上的按钮对象
mockDomButton.onClick = Grey.talk; // 绑定点击事件
mockDomButton.onClick() // 输出的结果是 undefined says hello 为了修改这种，必须绑定 talk

// 方案一：在构造器里显式调用 bind 函数绑定 this
constructor (name) {
   this.talk = this.talk.bind(this); // 缺点：繁琐
}
// 方案二：使用类属性+箭头函数的方式来定义方法
class Person {
  talk = () => { console.log(`${this.name} says hello`) }
}
// 缺点一：这个方法不在原型链上，即 Person.prototype.talk 的值是undefined ，所以这个类的子类并不能使用 super.talk() 调用到父类这个方法。
class Student extends Person {
  talk = () => {
    super.talk(); // 报错
    console.log("student talk hi");
  }
}
const student = new Student('Tom');
student.talk();
// 缺点二：每次创建一个 Person 实例都会创建一个 talk 函数，造成性能浪费
const Grey = new Person('Grey')
const Tom = new Person('Tom')
console.log(Grey.talk === Tom.talk); //  输出 false
```



优秀文章：

[应该在 JavaScript 中使用 Class 吗？](https://zhuanlan.zhihu.com/p/158956514) 