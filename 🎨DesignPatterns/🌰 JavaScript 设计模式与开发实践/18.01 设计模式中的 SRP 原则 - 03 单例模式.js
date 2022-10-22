// 职责: 获取单例
const getSingle = function (fn) {
  let result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

// 职责: 创建登录浮窗
const createLoginLayer = function () {
  const div = document.createElement("div");
  div.innerHTML = "我是登录浮窗";
  document.body.appendChild(div);
  return div;
};

const createSingleLoginLayer = getSingle(createLoginLayer);
const loginLayer1 = createLoginLayer();
const loginLayer2 = createLoginLayer();
