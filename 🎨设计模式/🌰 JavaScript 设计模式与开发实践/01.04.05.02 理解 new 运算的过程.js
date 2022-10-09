/**
 * 构造函数 & 添加一个 getName 方法
 * @param {string} 构造函数的参数
 */
function Person(name) { this.name = name; }
Person.prototype.getName = function () { return this.name; };

/**
 * 创建构造函数的实例(克隆对象 → 给对象的构造函数设置原型 → 给对象设置属性)
 * @param {function} 构造函数
 * @param {string} 构造函数的参数
 * @returns {object} 构造函数的实例
 */
var objectFactory = function () {
  var Constructor = [].shift.call(arguments); // 获取构造函数(第一个参数)
  var constructorProps = arguments; // 构造函数的参数

  var obj = new Object(); // 从根对象中克隆一个空对象
  obj.__proto__ = Constructor.prototype; // 让「空对象的构造函数」的原型指向「构造函数(Constructor)」的原型

  var ret = Constructor.apply(obj, constructorProps); // 执行构造函数(给空对象设置属性)

  return typeof ret === "object" ? ret : obj;
};

var a = objectFactory(Person, "sven");

console.log(a.name); // => 'sven
console.log(a.getName); // => ƒ () { return this.name; }
console.log(Object.getPrototypeOf(a) === Person.prototype); // => true

