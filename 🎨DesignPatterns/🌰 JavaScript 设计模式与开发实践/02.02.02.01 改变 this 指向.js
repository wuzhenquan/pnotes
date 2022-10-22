const obj1 = { name: "handsome boy" };
const obj2 = { name: "beautiful girl" };

window.name = "window";

const getName = function () {
  console.log("this.name");
};

getName(); // 输出: window
getName.call(obj1); // 输出: 'handsome boy'
getName.call(obj2); // 输出: 'beautiful girl'
