// 我觉的这个代码写得太绕了，并不是一个好例子

// 内部状态：uploadType(因为插件上传、Flash 上传、表单上传的实际工作原理区别很大)
// 外部状态：文件名，文件大小，dom 节点

const DEL_CONFIRM = "确定要删除该文件吗？";
const createHTML = (fileName, fileSize) => {
  return `<span>文件名称：${fileName}, 文件大小： ${fileSize}</span><button class="delFile">删除</button>`;
};
const createDom = (params) => {
  const { fileName, fileSize, delFile } = params;
  const dom = document.createElement("div");
  dom.innerHTML = createHTML(fileName, fileSize);
  dom.querySelector(".delFile").onclick = delFile;
  document.body.appendChild(dom);
  return dom;
};

/* ------------------------- 内部状态: uploadType  ------------------------- */
function Upload(uploadType) {
  this.uploadType = uploadType;
}

// 不需要 Upload.prototype.init（因为 upload 对象初始化的工作放在了 uploadManage）
// 只需要 Upload.prototype.delFile
Upload.prototype.delFile = function (id) {
  // 通过 uploadManager.setExternalState 方法给共享对象设置正确的 fileSize
  // 获取该文件对应的共享对象 (为了拿到 dom 和 fileSize 和 fileName)
  uploadManager.setExternalState(id, this);

  const removeSelf = () => this.dom.parentNode.removeChild(this.dom);
  if (this.fileSize < 3000) removeSelf();
  else if (window.confirm(`${DEL_CONFIRM}${this.fileName}`)) removeSelf();
};

/* ------------------------- 共享对象工厂函数 ------------------------- */
const UploadFactory = (function () {
  const createdFlyWeightObjs = {};
  return {
    create: function (uploadType) {
      // 如果某种对象的共享对象已经被创建过，那么直接返回这个对象
      if (createdFlyWeightObjs[uploadType])
        return createdFlyWeightObjs[uploadType];

      // 否则，创建一个新的共享对象
      return (createdFlyWeightObjs[uploadType] = new Upload(uploadType));
    },
  };
})();

/* ------------------------- 封装外部状态 ------------------------- */
const uploadManager = (function () {
  // 缓存：外部状态
  let uploadDatabase = {}; // e.g. {id: { fileName, fileSize, dom }}

  return {
    // 负责向 UploadFactory 提交创建对象的请求
    add: (id, uploadType, fileName, fileSize) => {
      // 创建 dom
      const delFile = () => UploadFactory.create(uploadType).delFile(id);
      const dom = createDom({ fileName, fileSize, delFile });

      // 保存外部状态
      uploadDatabase[id] = { fileName, fileSize, dom };
    },
    // 用 uploadDatabase 保存所有 upload 对此的外部状态
    setExternalState(id, flyWeightObj) {
      const uploadData = uploadDatabase[id];
      for (let i in uploadData) {
        flyWeightObj[i] = uploadData[i];
      }
    },
  };
})();

/* ------------------------- 开始触发上传动作的函数 -------------------------*/
let id = 0;
window.startUpload = (uploadType, files) => {
  for (let i = 0, file; (file = files[i++]); ) {
    uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
  }
};

/* ------------------------- 测试 ------------------------- */
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
