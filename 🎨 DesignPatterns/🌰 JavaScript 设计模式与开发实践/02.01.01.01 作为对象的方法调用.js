// 当函数作为对象的方法被调用时，this 指向该对象
const obj = {
  name: "handsome boy",
  getName: function () {
    console.log(this === obj); // 输出：true
    console.log(this.name); // 输出：1
  },
};
obj.getName();
