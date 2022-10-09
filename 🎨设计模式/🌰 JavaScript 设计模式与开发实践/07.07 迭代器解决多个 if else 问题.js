// 优化前: 根据不同的浏览器获取相应的上传组件对象
// 缺点 难阅读、严重违反开闭原则
const supportFlash = () => {}; // supportFlash 函数未提供
const getUploadObj = function () {
  try {
    // 控件上传
    return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
  } catch (error) {
    if (supportFlash()) {
      // flash 上传
      const str = '<object type="application/x-shockwave-flash"></object>';
      return $(str).appendTo($("body"));
    } else {
      // 原生表单上传
      const str = '<input name="file" type="file"/>';
      return $(str).appendTo($("body"));
    }
  }
};

// 优化后: 把每种获取 upload 对象的方法都封装在各自的函数里
// 然后使用一个迭代器， 迭代获取这些 upload 对象，直到获取到一个可用的为止
const getActiveUploadObj = () => {
  try {
    return new ActiveXObject("TXFTNActiveX.FTNUpload");
  } catch (e) {
    return false;
  }
};
const getFloashUploadObj = () => {
  if (supportFlash()) {
    const str = '<object type="application/x-shockwave-flash"></object>';
    return $(str).appendTo($("body"));
  }
};
const getFormUploadObj = () => {
  const str = '<input name="file" type="file"/>';
  return $(str).appendTo($("body"));
};

const iteratorUploadObj = function () {
  for (let i = 0, fn; (fn = arguments[i++]); ) {
    const uploadObj = fn();
    if (uploadObj !== false) return uploadObj;
  }
};

const uploadObj = iteratorUploadObj(
  getActiveUploadObj,
  getFloashUploadObj,
  getFormUploadObj
);
