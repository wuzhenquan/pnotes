// uncurrying 的话题来自于 JavaScript 之父 Brendan Erich 在 2011 年发表的一篇 Twitter
// 以下
Function.prototype.uncurrying = function () {
  var self = this; // self 此时是 Array.prototype.push
  return function () {
    // arguments 原来是 [{ length: 1, 0: 1}, 2]
    // arguments 的第一个元素 { length: 1, 0: 1} 被截取给 obj
    // arguments 只剩 [2] 了
    var obj = Array.prototype.shift.call(arguments);
    // 相当于 Array.prototype.push.apply(obj, 2)
    return self.apply(obj, arguments);
  };
};

var push = Array.prototype.push.uncurrying();
var obj = { length: 1, 0: 1 };
push(obj, 2);
console.log(obj); // output: { '0': 1, '1': 2, length: 2 }

// 下面的代码是 uncurrying 的另外一种实现方式
Function.prototype.uncurrying = function () {
  var self = this;
  return function () {
    return Function.prototype.call.apply(self, arguments);
  };
};
