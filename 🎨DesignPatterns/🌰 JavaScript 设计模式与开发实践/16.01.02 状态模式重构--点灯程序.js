//定义 3 个状态类

// 将状态封装成独立的类 --- OffLightState 状态类
const OffLightState = function (light) {
  this.light = light;
};
OffLightState.prototype.buttonWasPressed = function () {
  console.log("弱光"); // offLightState 对应的行为
  this.light.setState(this.light.weakLightState); // 切换状态到 weakLightState
};

// 将状态封装成独立的类 --- WeakLightState 状态类
const WeakLightState = function (light) {
  this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function () {
  console.log("强光"); // weakLightState 对应的行为
  this.light.setState(this.light.strongLightState); // 切换状态到 strongLightState
};

// 将状态封装成独立的类 --- StrongLightState 状态类
const StrongLightState = function (light) {
  this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function () {
  console.log("关灯"); // strongLightState 对应的行为
  this.light.setState(this.light.offLightState); // 切换状态到 offLightState
};

// light 类（上下文 Context）
const Light = function () {
  // 为每个状态类都创建一个状态对象（每一个状态类的实例对象）
  // 可以很明显地看到电灯一共有多少种状态，
  // Context 将持有这些状态对象的引用，以便把请求委托给状态对象。
  // 用户的请求，即点击 button 的动作也是实现在 Context 中的。
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
};
Light.prototype.init = function () {
  const button = document.createElement("button");
  const self = this;

  this.button = document.body.appendChild(button);
  this.button.innerHTML = "开关";

  this.currState = this.offLightState; // 设置当前状态
  this.button.onclick = function () {
    // 通过 self.currState.buttonWasPressed() 将请求委托给当前持有的状态对象
    self.currState.buttonWasPressed();
  };
};
Light.prototype.setState = function (newState) {
  this.currState = newState;
};

const light = new Light();
light.init();

// 优点：
// 1 这些行为被分散和封装在各自对应的状态类之中，便于阅读和管理代码。
// 2 状态之间的切换都被分布在状态类内部，这使得我们无需别嫌过多的 if、else。
// 3 新增一种状态时，改动的代码也很少（只需增加一个新的状态类+改变切换规则）。
