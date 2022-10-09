/* ------------------------- 初代 ------------------------- */
// 缺点：创建了大量的对象 ｜ 内存占用过高
const Model = function (gender, underwear) {
  this.gender = gender;
  this.underwear = underwear;
};

Model.prototype.takePhoto = function () {
  console.log("gender=" + this.gender + " underwear=" + this.underwear);
};

// 男模特
for (let i = 1; i <= 50; i++) {
  const maleModel = new Model("male", `underwear${i}`);
  maleModel.takePhoto();
}

// 女模特
for (let j = 1; j <= 50; j++) {
  var femaleModel = new Model("female", `underwear${j}`);
  femaleModel.takePhoto();
}

/* ------------------------- 二代 ------------------------- */
// 和初代相比，只需要两个对象便完成了同样的功能
const Model = function (gender) {
  this.gender = gender; // 内部状态
};

Model.prototype.takePhoto = function () {
  console.log(`gender=${this.gender} underwear=${this.underwear}`);
};

// 男模特
const maleModel = new Model("male");
for (let i = 1; i <= 50; i++) {
  maleModel.underwear = `underwear${i}`; // 外部状态
  maleModel.takePhoto();
}

// 女模特
const femaleModel = new Model("female");
for (let j = 1; j <= 50; j++) {
  femaleModel.underwear = `underwear${j}`;
  femaleModel.takePhoto();
}
