/* 抽象父类 -- 饮品 */

const Beverage = function () {};

Beverage.prototype.boilWater = () => {
  console.log("煮沸");
};
// 这三种方法是子类必须重写的，为了防止忘记编写，至少可以在程序运行时得到一个错误
Beverage.prototype.brew = () => {}; // 空方法，子类需要重写
Beverage.prototype.pourInCup = () => {}; // 空方法，子类需要重写
Beverage.prototype.addCondiments = () => {}; // 空方法，子类需要重写
Beverage.prototype.init = function () {
  // 模板方法，该方法封装了子类的算法框架，作为一个算法模板，指导子类以何种顺序执行哪些方法
  this.boilWater();
  this.brew();
  this.pourInCup();
  this.addCondiments();
};

/* 创建 Coffee 和 Tea 子类 */

const Coffee = function () {};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = () => {
  console.log("用沸水冲泡咖啡");
}; // 重新父类方法
Coffee.prototype.pourInCup = () => {
  console.log("把咖啡倒进杯子");
}; // 重新父类方法
Coffee.prototype.addCondiments = () => {
  console.log("加糖和牛奶");
}; // 重新父类方法

const Tea = function () {};
Tea.prototype = new Beverage();
Tea.prototype.brew = () => {
  console.log("用沸水冲泡咖啡");
}; // 重新父类方法
Tea.prototype.pourInCup = () => {
  console.log("把咖啡倒进杯子");
}; // 重新父类方法
Tea.prototype.addCondiments = () => {
  console.log("加糖和牛奶");
}; // 重新父类方法

/* 实例化 Coffee 和 Tea 子类 */

const coffee = new Coffee();
coffee.init(); // 补充原型基础知识: 当 coffee 对下调用 init 方法时，由于 coffee 对象和 Coffee 构造器的原型 prototype 上都没有对应的 init 方法，所以该请求会顺着原型链，被委托给 Coffee 的“父类” Beverage 原型上的 init 方法。

const tea = new Tea();
tea.init(); // 补充原型基础知识: 当 Tea 对下调用 init 方法时，由于 Tea 对象和 Tea 构造器的原型 prototype 上都没有对应的 init 方法，所以该请求会顺着原型链，被委托给 Tea 的“父类” Beverage 原型上的 init 方法。

// TODO: 改写为 Class，子类用 extends 继承

// 总结：
// 平时在写代码的时候不建议这样用
// 原因，JavaScript 在语言层面并没有提供对抽象类的支持，我们也很难模拟抽象类的实现
// 结合上面的例子来说就是，brew、pourInCup、addCondiments 的子类方法必须重写
// 这完全寄托于程序员的记忆力和自觉性
