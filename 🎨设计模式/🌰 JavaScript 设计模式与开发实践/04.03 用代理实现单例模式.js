// CreateDiv 成了一个普通的、功能单一的类
const CreateDiv = function (html) {
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  const div = document.createElement("div");
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

// 代理模式实现保证只有一个实例的功能
// 缓存代理应用之一 可参考 ./06.08 缓存代理-计算乘积.js
const ProxySingletonCreateDiv = (function () {
  let instance;

  // 使用了闭包和高阶函数
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  };
})();

const a = new ProxySingletonCreateDiv("div1");
const b = new ProxySingletonCreateDiv("div2");
console.log(a === b); // true
