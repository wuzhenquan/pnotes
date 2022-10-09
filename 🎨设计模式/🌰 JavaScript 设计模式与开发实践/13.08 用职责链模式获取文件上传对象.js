// 在第 7 章有一个用迭代器获取文件上传对象的例子
// 当我们创建了一个迭代器来迭代器来迭代获取合适的文件上传对象
// 其实用职责链模式可以更简单
// 我们完全不用创建这个多余的迭代器

const getActiveUploadObj = function () {
  try {
    return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
  } catch (error) {
    return "nextSuccessor";
  }
};

const getFlashUploadObj = function () {
  if (supportFlash()) {
    var str = "";
    return $(str).appendTo($("body"));
  }
  return "nextSuccessor";
};

const getFormUploadObj = function () {
  return $('<form><input name="file" type="file" /></form>').appendTo(
    $("body")
  );
};

const getUploadObj = getActiveUploadObj
  .after(getFlashUploadObj)
  .after(getFormUploadObj);

console.log(getUploadObj());
