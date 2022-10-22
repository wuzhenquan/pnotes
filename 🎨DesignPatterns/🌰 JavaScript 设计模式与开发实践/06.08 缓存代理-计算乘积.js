// 创建一个求乘积的函数，大脑自动幻想为复杂的计算
const mult = function () {
  console.log("开始计算乘积");
  let a = 1;
  for (let i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};

// 缓存代理函数
const proxyMult = (function () {
  let cache = {};
  return function () {
    const args = Array.prototype.join.call(arguments, ",");
    if (args in cache) return cache[args];
    else return (cache[args] = mult.apply(this, arguments));
  };
})();

proxyMult(1, 2, 3, 4);
proxyMult(1, 2, 3, 4); // 由于已经缓存过，因此不需要再计算了
