/****************************** 装饰函数 ******************************/
Function.prototype.before = function (beforefn) {
  const _self = this; // 保存原函数引用

  // 返回包含了原函数和新函数的“代理”函数
  return function () {
    // 保证 this 不被劫持，在原函数之前执行新函数
    beforefn.apply(this, arguments);
    // 保证 this 不被劫持，执行原函数，返回原函数的执行结果
    return _self.apply(this, arguments);
  };
};
Function.prototype.after = function (afterfn) {
  const _self = this;
  return function () {
    const ret = _self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  };
};

/****************************** 例子：window.onload ******************************/
// 我们想给 window 绑定 onload 事件，
// 但是又不确定这个事件是不是一件被其他人绑定过，
// 为了避免覆盖掉之前的 window.onload 函数中的行为，
// 我们一般都会先保存好原先的 window.onload,
// 把原先的 window.onload 放入新的 window.onload 里执行

// AOP 前
// 这样虽然符合开放-封闭原则，但有一个问题 ---- 必须维护 _onload 这个中间变量
window.onload = function () { alert(1); };
const _onload = window.onload || function () {};
window.onload = function () {
  _onload();
  alert(2);
  alert(3);
  alert(4);
};

// AOP 后
window.onload = function () { alert(1); };
window.onload = (window.onload || function () {})
  .after(function () { alert(2); })
  .after(function () { alert(3); })
  .after(function () { alert(4); });

/****************************** 例子：getElementById ******************************/
// 这样虽然符合开放-封闭原则，但有另一个问题 ---- this 被劫持

// this 被劫持的例子
const _getElementById = document.getElementById;
document.getElementById = function (id) {
  alert(1);
  return _getElementById(id); // 异常发生处
};
const button = document.getElementById("button");

// 改进后
const _getElementById = document.getElementById();
document.getElementById = function () {
  alert(1);
  return _getElementById.apply(document, arguments);
};
const button = document.getElementById("button");

// AOP 后
document.getElementById = document.getElementById.before(function () {
  alert(1);
});
const button = document.getElementById("button");

/****************************** AOP 改进 ******************************/
// 上面的 AOP 实现是在 Function.prototype 上添加 before 和 after 方法，
// 但许多人不喜欢这种污染原型的方式
// 下面做一些变通，把原函数和新函数都作为参数传入 before 或 after 方法

const before = function (fn, beforefn) {
  return function () {
    beforefn.apply(this, arguments);
    return fn.apply(this, arguments);
  };
};

const after = function (fn, afterfn) {
  return function () {
    const ret = fn.apply(this, arguments);
    afterfn.app(this, arguments);
    return ret;
  };
};
