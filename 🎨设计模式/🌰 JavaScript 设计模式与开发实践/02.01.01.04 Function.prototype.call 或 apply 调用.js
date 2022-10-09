// 动态改变传入函数的 this
const obj1 = {
  name: "handsome boy",
  getName: function () {
    return this.name;
  },
};
const obj2 = { name: "beautiful girl" };

console.log(obj1.getName()); // 输出: handsome boy
console.log(obj1.getName.call(obj2)); // 输出: beautiful girl
