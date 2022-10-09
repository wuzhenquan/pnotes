const Light = function () {
  this.state = "off";
  this.button = null;
};

Light.prototype.init = function () {
  const button = document.createElement("button");
  const self = this;

  button.innerHTML = "开关";
  this.button = document.body.appendChild(button);
  this.button.onclick = function () {
    self.buttonWasPressed();
  };
};

Light.prototype.buttonWasPressed = function () {
  if (this.state === "off") {
    console.log("开灯");
    this.state = "on";
  } else if (this.state === "on") {
    console.log("关灯");
    this.state = "off";
  }
};

const light = new Light();
light.init();

// 由于需求变更，需要改造 buttonWasPressed

Light.prototype.buttonWasPressed = function () {
  if (this.state === "off") {
    console.log("弱光");
    this.state = "weakLight";
  } else if (this.state === "weakLight") {
    console.log("强光");
    this.state = "strongLight";
  } else if (this.state === "strongLight") {
    console.log("关灯");
    this.state = "off";
  }
};

// 缺点
// 1 违反开放-封闭原则
// 2 buttonWasPressed 会因为需求增加而膨胀
// 3 状态的切换非常不明显，没有办法一目了然知道一共有多少状态
// 4 太多的 if else 难以维护
