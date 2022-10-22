/* ------------------------- Folder 类（生产组合对象） ------------------------- */
// 组合对象
const Folder = function (name) {
  this.name = name;
  this.files = [];
};

Folder.prototype.add = function (file) {
  this.files.push(file);
};

Folder.prototype.scan = function () {
  console.log("开始扫描文件夹：" + this.name);
  for (let i = 0, file, files = this.files; (file = files[i++]); ) {
    file.scan();
  }
};

/* ------------------------- File 类(生产叶对象) ------------------------- */
// 叶对象
const File = function (name) {
  this.name = name;
};

File.prototype.add = function () {
  throw new Error("文件下面不能再添加文件");
};

File.prototype.scan = function () {
  console.log("开始扫描文件：" + this.name);
};

/* ------------------------- test ------------------------- */
// 创建文件夹和文件
/**
 * folder
    │   file3
    └───folder1
    │   │   file1
    └───folder2
        │   file2
 */
const folder = new Folder("学习资料");
const folder1 = new Folder("JavaScript");
const folder2 = new Folder("jQuery");

const file1 = new File("JavaScript 设计模式与开发实践");
const file2 = new File("精通 jQuery");
const file3 = new File("重构与设计模式");

folder1.add(file1);
folder2.add(file2);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);

// 复制黏贴
/**
 * folder
    │   file3
    │   file5 // #new
    └───folder1
    │   │   file1
    └───folder2
        │   file2
    └───folder3 // #new
        │   file4 // #new
 */
const folder3 = new Folder("Nodejs");
const file4 = new File("深入浅出 Node.js");
folder3.add(file4);

const file5 = new File("JavaScript 语言精髓与编程实践");

folder.add(folder3);
folder.add(file5);

// 扫描文件夹
folder.scan();
