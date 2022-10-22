/* 反例 */
var report = function (src) {
  const img = new Image();
  img.src = src;
};
// 当 report 函数的调用结束后，img 局部变量随即被销毁，
// 而此时或许还没来得及发出 HTTP 请求，
// 所以此次请求就会丢失掉

report("http://xx.com/getUserInfo");

/* 改正 */
// 现在我们把 img 变量用闭包封闭起来，便能解决请求丢失的问题
var report = function () {
  var imgs = [];
  return function (src) {
    var img = new Image();
    imgs.push(img);
    img.src = src;
  };
};
