var mult = (function () {
  var cache = {};
  var calculate = function () {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i];
    }
    return a;
  };
  return function () {
    var args = Array.prototype.join.call(arguments, ",");
    if (args in cache) {
      console.log("用缓存了");
      return cache[args];
    }

    return (cache[args] = calculate.apply(null, arguments));
  };
})();
console.log(mult(1, 2, 3)); // => 6
console.log(mult(1, 2, 3)); // => 6 (实际没有计算 从 cache 里拿的)
