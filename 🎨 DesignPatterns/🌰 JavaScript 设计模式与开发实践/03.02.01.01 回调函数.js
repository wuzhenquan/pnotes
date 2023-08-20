// 异步请求
var getUserInfo = function (userId, callback) {
  $.ajax("http://xxx.com/getUserInfo?" + userId, function (data) {
    typeof callback === "function" && callback(data);
  });
};
getUserInfo(13157, function (data) {
  alert(data.userName);
});

// 创建节点
var appendDiv = function (callback) {
  for (var i = 0; i < 100; i++) {
    var div = document.createElement("div");
    div.innerHTML = i;
    document.body.appendChild(div);
    typeof callback === "function" && callback(data);
    callback(div);
  }
};
appendDiv(function (node) {
  node.style.display = "none";
});
