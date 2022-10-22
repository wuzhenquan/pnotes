/* 父类 */
const Beverage = function () {};

Beverage.prototype.boilWater = () => {
  console.log("煮沸");
};
// 这三种方法是子类必须重写的，为了防止忘记编写，至少可以在程序运行时得到一个错误
Beverage.prototype.brew = () => {
  throw new Error("子类必须重写 brew 方法");
};
Beverage.prototype.pourInCup = () => {
  throw new Error("子类必须重写 pourInCup 方法");
};
Beverage.prototype.addCondiments = () => {
  throw new Error("子类必须重写 addCondiments 方法");
};

// 挂钩子
Beverage.prototype.customerWantsCondiments = () => true; // 默认需要调料

Beverage.prototype.init = function () {
  this.boilWater();
  this.brew();
  this.pourInCup();

  // 如果钩子返回 true，则需要调料
  if (this.customerWantsCondiments()) {
    this.addCondiments();
  }
};

/* 子类 */
const CoffeeWithHook = function () {};
CoffeeWithHook.prototype = new Beverage();
CoffeeWithHook.prototype.brew = () => {
  console.log("用沸水冲泡咖啡");
};
CoffeeWithHook.prototype.pourInCup = () => {
  console.log("把咖啡倒进杯子");
};
CoffeeWithHook.prototype.addCondiments = () => {
  console.log("加糖和牛奶");
};

// 子类重写钩子
CoffeeWithHook.prototype.customerWantsCondiments = () => {
  return console.log("请问需要调料吗");
};

const coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();
