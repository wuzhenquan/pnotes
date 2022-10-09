// 通常，在 JavaScript 中实现 AOP，
// 都是指把一个函数“动态织入”到另外一个函数中，
// 具体的实现技术有很多，这里只举例 Function.prototype 的扩展

// 具体的实现方法
// 总体来说就是在执行装饰函数的时候
// 进入一个 return 函数的高阶函数
// 在 return 的这个函数里，根据装饰函数的功能对应顺序执行原函数或者装饰函数

// 涉及到的知识点: 「高阶函数」「Function.prototype.apply」

// 1. 进入一个 return 函数的高阶函数
// 2. 执行 before 函数的参数函数
// 3. 执行原函数
Function.prototype.before = function (nextFn) {
  var originalFn = this; // 保存原函数的引用(this 是原函数)
  return function () {
    // 返回包含了新函数和原函数的“代理”函数
    nextFn.apply(this, arguments); // 执行新函数, 修正 this
    return originalFn.apply(this, arguments); // 执行原函数
  };
};

// 1. 进入一个 return 函数的高阶函数
// 2. 执行 before 函数的参数函数
// 3. 执行原函数
Function.prototype.after = function (nextFn) {
  var originalFn = this;
  return function () {
    const ret = originalFn.apply(this, arguments);
    nextFn.apply(this, arguments);
    return ret;
  };
};

const func = function () {
  console.log(2);
};

func = func
  .before(() => console.log(1))
  .after(() => console.log(3));

func();

/* AOP 改进 ******************************/
// 上面的 AOP 实现是在 Function.prototype 上添加 before 和 after 方法，
// 但许多人不喜欢这种污染原型的方式
// 下面做一些变通，把原函数和新函数都作为参数传入 before 或 after 方法

const before = function (originalFn, nextFn) {
  return function () {
    nextFn.apply(this, arguments);
    return originalFn.apply(this, arguments);
  };
};

const after = function (originalFn, nextFn) {
  return function () {
    const ret = originalFn.apply(this, arguments);
    nextFn.apply(this, arguments);
    return ret;
  };
};

const foo = () => console.log(2);
before(foo,  () => console.log(1))();
after(foo, () => console.log(3))();
