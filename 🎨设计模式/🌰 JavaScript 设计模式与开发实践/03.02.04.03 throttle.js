var throttle = function (fn, interval) {
  var _self = fn;
  var timer;
  var firstTime = true;

  return function () {
    var args = arguments;
    var _me = this;

    if (firstTime) {
      _self.apply(_me, args);
      return (firstTime = false);
    }

    //如果定时器还在，说明前一次延迟执行还没有完成
    if (timer) return false;

    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 500);
  };
};

window.onresize = throttle(function () {
  console.log(1);
}, 500);

// more: 
// https://llu.is/throttle-and-debounce-visualized/