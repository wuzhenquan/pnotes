/** 迭代器模式 */
// 职责: 迭代器，迭代聚合对象
const each = function (obj, callback) {
  let value;
  let i = 0;
  let length = obj.length;
  let isArray = Array.isArray(obj);

  if (isArray) {
    for (; i < length; i++) {
      callback.call(obj[i], i, obj[i]);
    }
  } else {
    for (i in obj) {
      value = callback.call(obj[i], i, obj[i]);
    }
  }

  return obj;
};

// 职责：渲染函数
const appendChild = function (data) {
  each(data, function (i, n) {
    let div = document.createElement("div");
    div.innerHTML = n;
    document.body.appendChild(div);
  });
};

appendChild([1, 2, 3, 4, 5, 6]);
appendChild({ a: 1, b: 2, c: 3, d: 4 });
