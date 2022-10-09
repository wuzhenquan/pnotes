// 场景： 同时上传 1000 个文件，对应就有 1000 个上传对象
// 以下是未重构的代码

const DEL_CONFIRM = "确定要删除该文件吗？";
const createHTML = (fileName, fileSize) => {
  return `<span>文件名称：${fileName}, 文件大小： ${fileSize}</span><button class="delFile">删除</button>`;
};

/* ------------------------- Upload 构造函数 ------------------------- */
function Upload(uploadType, fileName, fileSize) {
  this.uploadType = uploadType;
  this.fileName = fileName;
  this.fileSize = fileSize;
  this.dom = null;
}

// 创建 DOM 节点(文件名称 文件大小 删除按钮)
Upload.prototype.init = function (id) {
  this.id = id;
  this.dom = document.createElement("div");
  this.dom.innerHTML = createHTML(this.fileName, this.fileSize);
  this.dom.querySelector(".delFile").onclick = () => this.delFile();
  document.body.appendChild(this.dom);
};

// 文件大小超过 3000KB，弹出提示框，用户点击了确认才能删除
Upload.prototype.delFile = function () {
  const remove = () => this.dom.parentNode.removeChild(this.dom);
  if (this.fileSize < 3000) remove();
  else if (window.confirm(`${DEL_CONFIRM}${this.fileName}`)) remove();
};

/* ------------------------- 开始触发上传动作的函数 -------------------------*/
let id = 0;
window.startUpload = (uploadType, files) => {
  // 可以看到这边创建了非常多个对象
  for (let i = 0, file; (file = files[i++]); ) {
    const uploadObj = new Upload(uploadType, file.fileName, file.fileSize);
    uploadObj.init(id++); // 给 upload 对象设置一个唯一的 id
  }
};

/* 创建 3 个插件上传对象 */
startUpload("plugin", [
  { fileName: "1.txt", fileSize: 1000 },
  { fileName: "2.txt", fileSize: 3000 },
  { fileName: "3.txt", fileSize: 5000 },
]);

/* 创建 3 个 Flash 上传对象 */
startUpload("flash", [
  { fileName: "4.txt", fileSize: 1000 },
  { fileName: "5.txt", fileSize: 3000 },
  { fileName: "6.txt", fileSize: 5000 },
]);
