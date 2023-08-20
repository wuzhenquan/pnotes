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
  this.signState = new SignState(this); // 设置初始状态为 waiting
  this.uploadingState = new UploadingState(this);
  this.pauseState = new PauseState(this);
  this.doneState = new DoneState(this);
  this.errorState = new ErrorState(this);
  this.currState = this.signState; // 设置当前状态
};

/** 创建节点：暂停和继续上传, 删除文件按钮 */
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

/** 负责具体的按钮事件实现，
 * 在点击了按钮之后，Context 并不做任何具体的操作，
 * 而是把委托给当前的状态类来执行
 */
Upload.prototype.bindEvent = function () {
  const self = this;
  this.button1.onclick = () => self.currState.clickHandler1();
  this.button2.onclick = () => self.currState.clickHandler2();
};

Upload.prototype.sign = function () {
  this.plugin.sign();
  this.currState = this.signState;
};

Upload.prototype.uploading = function () {
  this.button1.innerHTML = "正在上传, 点击暂停";
  this.plugin.uploading();
  this.currState = this.uploadingState;
};

Upload.prototype.pause = function () {
  this.button1.innerHTML = "已暂停，点击继续上传";
  this.plugin.pause();
  this.currState = this.pauseState;
};

Upload.prototype.done = function () {
  this.button1.innerHTML = "上传完成";
  this.plugin.done();
  this.currState = this.doneState;
};

Upload.prototype.error = function () {
  this.button1.innerHTML = "上传失败";
  this.currState = this.errorState;
};

Upload.prototype.del = function () {
  this.plugin.del();
  this.dom.parentNode.removeChild(this.dom);
};

/** 编写各个状态类的实现 */
const StateFactory = (function () {
  const State = function () {};
  State.prototype.clickHandler1 = function () { throw new Error("子类必须重写父类的 clickHandler1 方法"); };
  State.prototype.clickHandler2 = function () { throw new Error("子类必须重写父类的 clickHandler2 方法"); };

  return function (param) {
    const F = function (uploadObj) { this.uploadObj = uploadObj; };

    F.prototype = new State();

    for (var i in param) { F.prototype[i] = param[i]; }

    return F;
  };
})();

const SignState = StateFactory({
  clickHandler1: () => console.log("扫描中，点击无效"),
  clickHandler2: () => console.log("文件正在上传中，不能删除"),
});

const UploadingState = StateFactory({
  clickHandler1: () => this.uploadObj.pause(),
  clickHandler2: () => console.log("文件正在上传中，不能删除"),
});

const PauseState = StateFactory({
  clickHandler1: () => this.uploadObj.uploading(),
  clickHandler2: () => this.uploadObj.del(),
});

const DoneState = StateFactory({
  clickHandler1: () => console.log("文件已上传完成，点击无效"),
  clickHandler2: () => this.uploadObj.del(),
});

const ErrorState = StateFactory({
  clickHandler1: () => console.log("文件上传完成失败，点击无效"),
  clickHandler2: () => this.uploadObj.del(),
});

/** 测试 */
const uploadObj = new Upload("这是一个文件");
uploadObj.init();

window.external.upload = (state) => uploadObj[state]();
window.external.upload("sign");

setTimeout(() => window.external.upload("uploading"), 1000);
setTimeout(() => window.external.upload("done"), 5000);
