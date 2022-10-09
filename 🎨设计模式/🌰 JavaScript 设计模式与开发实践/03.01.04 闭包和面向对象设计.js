/* 用面向对象能实现的功能，闭包也能实现 */

// 面向对象 1
var extent = {
  value: 0,
  call: function () {
    this.value++;
    console.log(this.value);
  },
};
extent.call(); // output: 1
extent.call(); // output: 2
extent.call(); // output: 3

// 面向对象 2
var Extent = function () {
  this.value = 0;
};
Extent.prototype.call = function () {
  this.value++;
  console.log(this.value);
};
const extent = new Extent();
extent.call(); // output: 1
extent.call(); // output: 2
extent.call(); // output: 3

// 闭包也能实现
var extent = function () {
  var value = 0;
  return {
    call: function () {
      value++;
      console.log(value);
    },
  };
};
var extent = extent();
extent.call(); // output: 1
extent.call(); // output: 2
extent.call(); // output: 3
