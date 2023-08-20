// 浏览器嗅探

// 优化前
// 缺点: 每次调用都会执行 if 条件分支
var addEvent = function (elem, type, about) {
  if (window.addEventListener) {
    return elem.addEventListener(type, handler, false);
  }
  if (window.attachEvent) {
    return elem.attachEvent("on" + type, handler);
  }
};

// 优化后 1.0
// 缺点: 即使没有过也会执行一次多余的嗅探工作
var addEvent = (function () {
  if (window.addEventListener) {
    return function (elem, type, handler) {
      elem.addEventListener(type, handler, false);
    };
  }
  if (window.attachEvent) {
    return function (elem, type, handler) {
      elem.attachEvent("on" + type, handler);
    };
  }
})();

// 优化后 2.0
// 在第一次进入条件分支后
// 在函数内部会重写这个函数
// 重写之后的函数就是我们期望的 addEvent 函数
// 在下次进入 addevent 函数的时候
// addEvent 函数里不再存在条件分支
var addEvent = function (elem, type, handler) {
  if (window.addEventListener) {
    addEvent = function (elem, type, handler) {
      elem.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    addEvent = function (elem, type, handler) {
      elem.attachEvent("on" + type, handler);
    };
  }
  addEvent(elem, type, handler);
};
