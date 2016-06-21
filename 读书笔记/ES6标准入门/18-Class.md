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
// 一次添加多个新方法
Object.assign(Point.prototype, {
  funcOne(){}
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