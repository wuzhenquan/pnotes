const getSingle = function (fn) {
  var ret;
  return function () {
    return ret || (ret = fn.apply(this, arguments));
  };
};

/* 这个高阶函数的例子，即把函数当作参数传递，又让函数执行后返回了另外一个函数 */

// 执行效果
const getScript = getSingle(function () {
  return document.createElement("script");
});

const script1 = getScript();
const script2 = getScript();

console.log("script1", script1);
console.log(script1 === script2); // output: true
