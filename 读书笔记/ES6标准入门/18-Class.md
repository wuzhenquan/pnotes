ES6 的 Class 知识面向对象编程的语法糖

```javascript
class Point{} // 定义一个类
typeof Point // 'function' 说明类的数据类型就是函数
Point === Point.prototype.constructor // true  类本身就指向构造函数
```

定义类的方法

```javascript
class Point{
  constructor(){}
  toString(){}
  toValue(){}
}
// 用 class 定义的类内部的方法都是不可枚举的
Object.keys(Point.prototype) //[]
// 相当于
//Point.prototype = {
//  constructor(){},
//  toString(){},
//  toValue(){}
//}
// 一次添加多个新方法
Object.assign(Point.prototype, {
  funcOne(){},
  funcTwo(){}
})
```

实例对象

```javascript
class Point{
  constructor(x,y){
  	this.x = x;
    this.y = y;
  }
  toString(){
    return '('+this.x+','+this.y+')'
  }
}
var point = new Point(2,3);
point.toString()
```

#### **constructor**

每一个使用class方式定义的类默认都有一个**constructor**函数， 这个函数是构造函数的主函数， 该函数体内部的**this**指向生成的实例

```javascript
class Cat { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}
var cat = new Cat('miao')
cat.speak() // miao makes a noise.
```

#### super

```javascript
class Cat { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  constructor(name, color) {
     super(name); // 即调用父类的构造函数
     this.color = color;
  }

  speak() {
    // 调用父类的 speak 方法
    super.speak();
    console.log(this.name + ' roars.');
  }
}

var a = {
  val() {
    return this === super.valueOf();
  }
}
console.log(a.val()) // 返回 true
```

在 constructor(){} 中想让子类用 this 对象, 子类必须在 constructor(){} 方法中调用 super 方法, 否则新建实例时会报错. 这是因为 constructor(){} 里的 this 对象不是自己的 this 对象, 而是继承了父类的 this 对象然后对其进行加工. 如果不调用 super 方法, 子类的 constructor(){} 就得不到 this 对象. 

在子类的构造函数 constructor(){} 中, 只有调用 super 之后, constructor(){} 才可以使用 this 关键字, 否则会报错.

```javascript
class Point {
  constructor(x,y){
    this.x = x
    this.y = y
  }
}
class Color extends Point {
  constructor(x,y,color){
    this.color = color // ReferenceError
    super(x,y)
    this.color = color // 正确
  }
}
```



**Object.setPrototypeOf()** 设置一个对象的 prototype 对象

**Object.getPrototypeOf()** 读取一个对象的 prototype 对象

继承

```javascript
class SuperType{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  toSuperString(){
    return '(' + this.x + ',' + this.y + ')'
  }
}
class SubType extends SuperType{
  constructor(x, y, color){
    super(x, y);
    this.color = color;
  }
  toSubString(){
    return this.color + super.toSuperString();
  }
}

var superr = new SuperType('aaa', 'bbb');
superr.toSuperString(); // "(aaa,bbb)"
var subb = new SubType('ccc', 'ddd', 'red');
subb.toSubString(); // "red(ccc,ddd)"
```
**static 静态方法**

在类里的函数名前声明 static, 那么这个函数就是静态函数, 该方法就是静态方法

和原型没啥关系, 意思就是不会被实例继承, 而是直接通过类(不需要创建实例)就可以调用了

也就是说这个函数有一个方法咯

```javascript
"use strict";
class Person {
    constructor(name) {
        this.name = name;
    }
    static say () {
        console.log("say hi");
    }
};
Person.say() // say hi
var person = new Person();
person.say() // 报错, 因为静态方法不会被实例继承
```

父类的静态方法可以被子类继承

```javascript
class Foo{
  static classMethod(){
    return 'hello'
  }
}
class Bar extends Foo {}
Bar.classMethod() // 'hello'

// 也可以从 super 上调用这个静态方法
class Foo{
  static classMethod(){
    return 'hello'
  }
}
class Bar extends Foo {
  static barClassMethod(){
    return super.classMethod() + ',too'
  }
}
Bar.barClassMethod() // 'hello,too'
```



**其实ES6的class只是个语法糖罢了**

```javascript
class Super {...};
class Sub extends Super {...};
var subObj = new Sub();

// 与下面的等价

function Super() {...};
function Sub() {...};
Sub.prototype.__proto__ = Super.prototype;
//或
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;//因为上一步造成constructor为Super
//或
Sub.prototype = Object.create(Super.prototype, {
  constructor: subClass,
});
var subObj = new Sub();
```

```javascript
class Super {
  constructor() {
    //do something
  }
}
class Sub extends Super {
  constructor() {
    super()
    //do something else
  }
}

// 与下面等价

function Super() {
  //do something
}
function Sub() {
  Sub.prototype.__proto__ = Super.prototype; //extends
  Super.call(this); //constructor中的super
  //但是其实这个地方严格讲是有问题的
  //在使用ES6 class的时候，constructor并不负责创建成员函数
  //但是在用Constructor function时，一个function要管所有的
  //成员变量和函数的创建。
  //而Super里的所有东西都释放到当前上下文this中是不合适的
  //会出现命名冲突之类的
  //babel的具体的实现要比这个复杂很多。
  //do something else
}
```




