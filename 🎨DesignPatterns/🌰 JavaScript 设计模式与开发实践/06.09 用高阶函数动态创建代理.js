/* ------------------------- 计算乘积 ------------------------- */
const mult = function () {
  console.log("开始计算乘积");
  let a = 1;
  for (let i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};
/* ------------------------- 计算加和 ------------------------- */
var plus = function () {
  let a = 0;
  for (let i = 0, l = arguments; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};
/* ------------------------- 高阶函数：创建缓存代理工厂 ------------------------- */
const createProxyFactory = function (fn) {
  let cache = {};
  return function () {
    const args = Array.prototype.join.call(arguments, ",");
    if (args in cache) return cache[args];
    else return (caches[args] = fn.apply(this, arguments));
  };
};

console.log(proxyMult(1, 2, 3, 4));
console.log(proxyMult(1, 2, 3, 4)); // 由于已经缓存过，因此不需要再计算了
console.log(proxyPlus(1, 2, 3, 4));
console.log(proxyPlus(1, 2, 3, 4)); // 由于已经缓存过，因此不需要再计算了
