// 缺点 增加了类的不透明性
var Singleton = function (name) {
  this.name = name;
  this.instance = null;
};
Singleton.prototype.getName = function () {
  console.log(this.name);
};
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};
// 测试
var a = Singleton.getInstance("sven1");
var b = Singleton.getInstance("sven2");
console.log(a === b); // => true

/*** 用闭包和高阶函数改造一下 ***/

var Singleton = function (name) {
  this.name = name;
};
Singleton.prototype.getName = function () {
  console.log(this.name);
};
Singleton.getInstance = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();
// 测试
var a = Singleton.getInstance("sven1");
var b = Singleton.getInstance("sven2");
console.log(a === b); // => true

// 这种方式的缺点:
// Singleton 类的使用者必须知道这是一个单例类
// 跟以往通过 new XXX 的方式来获取对象不同
// 这里偏要使用 Singleton.getInstance 来获取对象
