const delOld = (obj) => {
  let ret;
  if (!obj.isReadOnly) {
    if (obj.isFolder) {
      ret = deleteFile(obj);
    } else if (obj.isFile) {
      ret = deleteFile(obj);
    }
  }
  return ret;
};

// 改成：

const del = (obj) => {
  if (obj.isReadOnly) {
    return;
  }
  if (obj.isFolder) {
    return;
  }
  if (obj.isFile) {
    return;
  }
};
