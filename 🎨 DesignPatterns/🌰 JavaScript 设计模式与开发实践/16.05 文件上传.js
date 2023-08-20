/** 上传插件 */
window.external.upload = (state) => console.log(state); // 可能为 sign、uploading、done、error

/** 上传的插件对象 */
const plugin = (function () {
  const plugin = document.createElement("embed");
  plugin.style.display = "none";
  plugin.type = "application/txftn-webkit";

  plugin.sign = () => console.log("开始文件扫描");
  plugin.pause = () => console.log("暂停文件上传");
  plugin.uploading = () => console.log("开始文件上传");
  plugin.del = () => console.log("删除文件上传");
  plugin.done = () => console.log("文件上传完成");

  document.body.appendChild(plugin);
  return plugin;
})();

/** 定义 Upload 类 */
const Upload = function (fileName) {
  this.plugin = plugin;
  this.fileName = fileName;
  this.button1 = null;
  this.button2 = null;
  this.state = "sign"; // 初始状态设为 waiting
};

// 创建节点：暂停和继续上传, 删除文件按钮
Upload.prototype.init = function () {
  const that = this;
  this.dom = document.createElement("div");
  this.dom.innerHTML = `<span>文件名称:${this.fileName}</span>
         <button data-action="button1">扫描中</button>
         <button data-action="button2">删除</button>`;

  document.body.appendChild(this.dom);
  this.button1 = this.dom.querySelector('[data-action="button1"'); // 暂停和继续上传按钮
  this.button2 = this.dom.querySelector('[data-action="button2"'); // 删除按钮
  this.bindEvent();
};

// 给按钮绑定事件
Upload.prototype.bindEvent = function () {
  const self = this;
  // 暂停和继续上传按钮：切换状态或打印状态
  this.button1.onclick = () => {
    // 状态：扫描中、上传中、暂停、上传完成、上传失败
    switch (self.state) {
      case "sign": console.log("扫描中, 点击无效..."); break;
      case "uploading": self.changeState("pause"); break;
      case "pause": self.changeState("uploading"); break;
      case "done": console.log("文件已完成上传, 点击无效"); break;
      case "error": console.log("文件上传失败, 点击无效"); break;
      default: break;
    }
  };

  // 删除按钮
  this.button2.onclick = () => {
    // 上传完成、上传失败、暂停状态都可以删除
    if (["done", "error", "pause"].includes(self.state)) {
      self.changeState("del");
    }
    switch (self.state) {
      // 状态：上传完成、上传失败、暂停、扫描中、上传中
      case "done":
      case "error":
      case "pause": self.changeState("del"); break;
      case "sign": console.log("文件正在上传中, 不能删除"); break;
      case "uploading": console.log("文件正在上传中, 不能删除"); break;
      default: break;
    }
  };
};

// 负责切换状态之后的具体行为
Upload.prototype.changeState = function (state) {
  switch (state) {
    case "sign":
      this.plugin.sign();
      this.button1.innerHTML = "扫描中,  任何操作无效";
      break;
    case "uploading":
      this.plugin.uploading();
      this.button1.innerHTML = "正在上传, 点击暂停";
      break;
    case "pause":
      this.plugin.pause();
      this.button1.innerHTML = "正在上传, 点击暂停";
      break;
    case "done":
      this.plugin.done();
      this.button1.innerHTML = "上传完成";
      break;
    case "error":
      this.button1.innerHTML = "上传失败";
      break;
    case "del":
      this.plugin.del();
      this.dom.parentNode.removeChild(this.dom);
      break;
    default:
      break;
  }
  this.state = state;
};

/** 测试 */
const upload = new Upload("一本书");
upload.init(); // 插件调用 JavaScript 发的方法
window.external.upload("sign"); // 文件开始扫描
setTimeout(() => window.external.upload("uploading"), 1000); // 1 秒后开始上传
setTimeout(() => window.external.upload("done"), 5000); // 5 秒后开始上传

// 缺点
// 1 充斥着 switch 语句
// 2 状态和行为都被耦合在一个巨大的方法里
// 3 很难修改和扩展这个状态机
