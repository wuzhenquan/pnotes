/* ------------------------- 初代 ------------------------- */
// 缺点：拓展繁琐 ｜复用性差
var calculateBonus = function (performaceLevel, salary) {
  if (performanceLevel === "S") return salary * 4;
  if (performanceLevel === "A") return salary * 3;
  if (performanceLevel === "B") return salary * 2;
};
calculateBonus("B", 2000);

/* ------------------------- 二代 ------------------------- */
// 缺点：calculateBonus 如果很庞大，就会缺乏弹性
var performanceS = (salary) => salary * 4;
var performanceA = (salary) => salary * 3;
var performanceB = (salary) => salary * 4;
var calculateBonus = (performancelevel, salary) => {
  if (performanceLevel === "S") return performanceS(salary);
  if (performanceLevel === "A") return performanceA(salary);
  if (performanceLevel === "B") return performanceB(salary);
};
calculateBonus("A", 10000);

/* ------------------------- 三代 策略模式(模仿传统对象语言) ------------------------- */
var performanceS = function () {};
performanceS.prototype.calculate = function (salary) {
  return salary * 4;
};

var performanceA = function () {};
performanceA.prototype.calculate = function (salary) {
  return salary * 3;
};

var performanceB = function () {};
performanceB.prototype.calculate = function (salary) {
  return salary * 2;
};

var Bonus = function () {
  this.salary;
  this.strategy = null;
};
Bonus.prototype.setSalary = function (salary) {
  this.salary = salary;
}; // 设置员工的原始工资
Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy;
}; // 设置员工绩效等级对应的策略对象
Bonus.prototype.getBonus = function () {
  return this.strategy.calculate(this.salary);
}; // 把计算奖金的操作委托给对应的策略对象

var bonus = new Bonus();
bonus.setSalary(10000);

bonus.setStrategy(new performanceS()); // 设置策略对象
console.log(bonus.getBonus()); // => 4000

bonus.setStrategy(new performanceA()); // 设置策略对象
console.log(bonus.getBonus()); // => 3000

/* ------------------------- 三代 策略模式(针对 JS 语言的特有实现) ------------------------- */
// 策略类：定义一系列算法，被封装在策略类方法里
const strategies = {
  S: (salary) => salary * 4, // 策略对象 S
  A: (salary) => salary * 3, // 策略对象 A
  B: (salary) => salary * 2, // 策略对象 B
};
// 环境类 Context：把请求委托给策略类
const calculateBonus = (level, salary) => strategies[level](salary);

calculateBonus("S", 20000); // 80000
