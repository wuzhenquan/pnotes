// 优化前
var isString = function (obj) {
  return Object.prototype.toString.call(obj) === "[object String]";
};
var isArray = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
};
var isNumber = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Number]";
};
// 优化后
var isType = function (type) {
  return function (obj) {
    console.log("type", type);
    console.log("obj", obj);
    console.log(Object.prototype.toString.call(obj));
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
};
var isString = isType("String");
var isArray = isType("Array");
var isNumber = isType("Number");
console.log(isArray([1, 2, 3]));
