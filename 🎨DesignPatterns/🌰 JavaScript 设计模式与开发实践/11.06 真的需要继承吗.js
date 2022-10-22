// 是什么：别调用我们 我们会调用你
// 为什么：子类不希望自己频繁打扰父类

// - 不用上面两个例子的 prototype 继承的方式
// 为什么：不用继承是因为 JS 并没有提供真正的类式继承

const Beverage = function (param) {
  const boilWater = () => console.log("把水煮沸");

  const brew =
    param.brew ||
    function () {
      throw new Error("必须传递 brew 方法");
    };
  const pourInCup =
    param.pourInCup ||
    function () {
      throw new Error("必须传递 pourInCup 方法");
    };
  const addCondiments =
    param.addCondiments ||
    function () {
      throw new Error("必须传递 addCondiments 方法");
    };

  const F = function () {};

  F.prototype.init = () => {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  };

  return F;
};

const Coffee = Beverage({
  brew() {
    console.log("用沸水冲泡咖啡");
  },
  pourInCup() {
    console.log("把咖啡倒进杯子");
  },
  addCondiments() {
    console.log("加糖和牛奶");
  },
});

const Tea = Beverage({
  brew() {
    console.log("用沸水浸泡茶叶");
  },
  pourInCup() {
    console.log("把茶倒进杯子");
  },
  addCondiments() {
    console.log("加柠檬");
  },
});

const coffee = new Coffee();
coffee.init();

const tea = new Tea();
tea.init();
