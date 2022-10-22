/* ------------------------- Folder 类（生产组合对象） ------------------------- */
const Folder = function (name) {
  this.name = name;
  this.files = [];
  this.parent = null; // #new
};

Folder.prototype.add = function (file) {
  this.files.push(file);
  file.parent = this; // #new 设置父对象
};

Folder.prototype.scan = function () {
  console.log("开始扫描文件夹：" + this.name);
  for (let i = 0, file, files = this.files; (file = files[i++]); ) {
    file.scan();
  }
};

// #new
Folder.prototype.remove = function () {
  if (!this.parent) return; // 根节点或者树外的游离节点

  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    const file = files[l];
    if (file === this) files.splice(l, 1);
  }
};

/* ------------------------- File 类(生产叶对象) ------------------------- */
const File = function (name) {
  this.name = name;
  this.parent = null; // #new
};

File.prototype.add = function () {
  throw new Error("不能添加在文件下面");
};

File.prototype.scan = function () {
  console.log("开始扫描文件夹：" + this.name);
};

// #new
File.prototype.remove = function () {
  if (!this.parent) return; // 根节点或者树外的游离节点

  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    const file = files[l];
    if (file === this) files.splice(l, 1);
  }
};

/* ------------------------- 测试移除文件功能 ------------------------- */
const folder = new Folder("学习资料");
const folder1 = new Folder("JavaScript");
const file1 = new File("深入浅出 Node.js");

folder1.add(new File("JavaScript 设计模式与开发实践"));
folder.add(folder1);
folder.add(file1);

folder1.remove(); // 移除文件夹
folder.scan();

// => '开始扫描文件夹：学习资料'
// => '开始扫描文件夹：深入浅出 Node.js'
