const MyClassA = function () {
  this.name = "handsome boy";
};
console.log(new MyClassA().name);

// 如果构造器显示返回一个 object 类型的对象，结果会返回这个对象
const MyClassB = function () {
  this.name = "handsome boy";
  return { name: "beautiful boy" };
};
console.log(new MyClassB().name); // 输出: 'beautiful boy'

// 如果构造器显示返回一个非 object 类型的对象，结果返回构造函数创建的对象
const MyClassC = function () {
  this.name = "handsome boy";
  return "beautiful boy";
};
console.log(new MyClassC().name); // 输出: 'handsome boy'
