// 当函数不作为对象的属性被调用时，
// 也就是我们常说的普通函数方式,
// 此时的 this 总是指向全局对象。
// 在浏览器的 JavaScript 里，
// 这个全局对象是 window 对象。

window.name = "globalName";
const obj = {
  name: "handsome boy",
  getName: function () {
    return this.name;
  },
};
const getName = obj.getName;
console.log(getName()); // 输出 handsome boy
