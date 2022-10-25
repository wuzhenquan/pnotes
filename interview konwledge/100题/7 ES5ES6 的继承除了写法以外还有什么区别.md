https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20

继承机制完全不同，创建子类 this 不同，子类`__proto__`指向不同。

ES5 

- 是先创建子类实例对象的 this，然后将父类方法赋到这个 this 上。
- es5中的构造函数的 `__proto__ `是指向 Function.prototyope 的
- 通过 call 或者 apply 回调方法调用父类。

ES6

- 是先在子类构造函数中用 super 创建父类实例的 this , 再用子类的构造函数修改 this。
- 子类 B 的 `__proto__` 属性指向父类 A 即 B.`__proto__`= A.
- ES6 允许继承原生构造函数. 因为 ES6 先新建父类的实例对象 this。然后再用子类的构造函数修改 this，使得父类的所有行为都可以继承。因此可以在原生数据结构的基础上定义自己的数据结构.(es5中 Array，Error 等原生构造函数无法继承而 ES6 就可以自己定义这些原生构造函数)
- 通过 super 调用父类



>  ES5 继承(原型链继承)

原型链继承

整个继承过程，都是通过原型链之间的指向进行委托关联，直到最后形成了”由构造函数所构造“的结局。

```js
function A() {
  this.name = 'a';
}

A.prototype.getName = function getName() {
  return this.name
}

function B() {}
B.prototype = new A();

console.log(B.prototype.__proto__ === A.prototype); // true
console.log(B.__proto__ === A); // false
console.log(B.__proto__); // [Function]
```

> ES6 的继承

ES6 中新增了 class 关键字来定义类，通过保留的关键字 extends 实现了继承。实际上这些关键字只是一些语法糖，底层实现还是通过原型链之间的委托关联关系实现继承。

```js
class A {
  constructor(a) {
    this.name = a;
  }
  getName() {
    return this.name;
  }
}

class B extends A{
  constructor() {
    super();
  }
}

console.log(B.prototype.__proto__ === A.prototype); // true
console.log(B.__proto__ === A); // true
console.log(B.__proto__); // [Function: A]
```

ES5/6还有一些区别:

1. ES6 的类内部定义的所有方法都不可枚举，这在 ES5 中默认是可枚举的，甚至可不可枚举都可以用 defineProperty 配置；
2. ES6 内部默认使用严格模式；
3. 类内不存在变量提升，这个跟继承有关，必须保证子类在父类之后定义，如果允许变量提升就乱套了
4. ES5 的实例属性只能写在构造函数里，ES6 直接写在类里就行。





ES5的构造函数和ES6的Class区别

1. ES5的构造函数的原型上的属性和方法可以遍历/ES6 不能够遍历
2. ES6的类必须通过new调用，构造函数则可以不用
3. 类不存在变量提升
4. ES6的类没有私有方法和私有属性（正在提议中）
5. class多了一个静态方法（static）,里面的this指向的是类本身，静态方法可以被子类继承, 不会被实例继承
6. ES6的静态属性和静态方法
7. ES6 类多了一个new Target 可以判定new 的构造函数

[有深度](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20#issuecomment-524760336)

[class](https://github.com/wuzhenquan/Notes/blob/master/JavaScript基础知识点/ES6/class.md)