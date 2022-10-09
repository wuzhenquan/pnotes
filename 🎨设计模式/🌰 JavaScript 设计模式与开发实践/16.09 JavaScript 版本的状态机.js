/** 例子一 */
const Light = function () {
  this.currState = FSM.off; // 设置当前状态
  this.button = null;
};

Light.prototype.init = function () {
  const button = document.createElement("button");
  const self = this;

  button.innerHTML = "已关灯";
  this.button = document.body.appendChild(button);

  this.button.onclick = () => self.currState.buttonWasPressed.call(self);
};

const FSM = {
  off: {
    buttonWasPressed: function () {
      console.log("关灯");
      this.button.innerHTML = "下一次按我是开灯";
      this.currState = FSM.on;
    },
  },
  on: {
    buttonWasPressed: function () {
      console.log("开灯");
      this.button.innerHTML = "下一个按我是关灯";
      this.currState = FSM.off;
    },
  },
};

const light = new Light();
light.init();

/** 例子二
 * 利用下面的 delegate 函数来完成这个状态机的编写
 * 这是面向对象设计和闭包互换的一个例子
 * 前者把变量保存为对象的属性
 * 后者把变量封闭在闭包形成的环境中
 */
const delegate = (client, delegation) => {
  return {
    buttonWasPressed: () => {
      // 将客户的操作委托给 delegation 对象
      return delegation.buttonWasPressed.apply(client, arguments);
    },
  };
};

const FSM = {
  off: {
    buttonWasPressed: function () {
      console.log("关灯");
      this.button.innerHTML = "下一次按我是开灯";
      this.currState = FSM.on;
    },
  },
  on: {
    buttonWasPressed: function () {
      console.log("开灯");
      this.button.innerHTML = "下一个按我是关灯";
      this.currState = FSM.off;
    },
  },
};

const Light = function () {
  this.offState = delegate(this, FSM.off);
  this.onState = delegate(this, FSM.on);
  this.currState = this.offState; // 设置初始状态为关闭状态
  this.button = null;
};

Light.prototype.init = function () {
  const button = document.createElement("button");
  const self = this;

  button.innerHTML = "已关灯";
  this.button = document.body.appendChild(button);

  this.button.onclick = () => self.currState.buttonWasPressed();
};

const light = new Light();
light.init();
