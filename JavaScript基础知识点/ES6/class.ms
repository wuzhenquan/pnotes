constructor 就是构造函数

super

- 当作函数用
  - 相当于 `A.prototype.constructor.call(this, props)`
  - 调用父类的构造函数
  - 内部的 this 指向子类
- 当作对象用
  - 调用父类的方法. `super.c.call(this)` 相当于 `A.prototype.c.call(this)`
  - 不只是在 `constructor` 里能用.
  - 赋值的属性会变成子类实例的属性

- 子类的构造函数必须执行一次 super, 而且还是显式的.



ref:

https://www.jianshu.com/p/fc79756b1dc0