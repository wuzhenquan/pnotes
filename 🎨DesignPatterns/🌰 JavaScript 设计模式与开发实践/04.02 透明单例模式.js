/* 在页面中创建唯一的 div 节点 */

// 使用了闭包和高阶函数
const CreateDiv = (function () {
  let instance;

  // 使用了闭包
  const CreateDiv = function (html) {
    if (instance) return instance; // 保证只有一个实例
    this.html = html;
    this.init(); // 创建实例
    return (instance = this);
  };

  // 使用了高阶函数
  CreateDiv.prototype.init = function () {
    const div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };

  return CreateDiv;
})();

const a = new CreateDiv("div1");
const b = new CreateDiv("div3");
console.log(a === b); // true

// 缺点:
// - 复杂:
// 		- 为了把 instance 封装起来，
// 		- 我们使用了自执行的匿名函数和闭包，
// 		- 并且让这个匿名函数返回真正的 Singleton 构造方法。
// - 没有遵循「单一职责原则」:
// 		- 负责了两件事之一 创建对象和执行初始化方法
// 		- 负责了两件事之二 保证只有一个对象
