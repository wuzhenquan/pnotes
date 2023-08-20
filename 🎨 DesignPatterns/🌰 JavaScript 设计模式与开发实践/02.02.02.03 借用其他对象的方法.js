// 场景一 借用构造函数
const A = function (name) {
  this.name = name;
};

const B = function () {
  A.apply(this, arguments);
};

B.prototype.getName = function () {
  return this.name;
};

const b = new B("handsome boy");
console.log(b.getName()); // 输出 'handsome boy'

// 场景二 类数组借用数组的方法
(function () {
  Array.prototype.push.call(arguments, 3);
  console.log(arguments);
})(1, 2);

// 场景三 把类数组转成真正的数组
(function () {
  console.log(Array.prototype.slice.call(arguments)); // 输出
})(1, 2, 3);
