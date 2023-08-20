// currying 又称部分求值，
// 一个 currying 的函数首先会接受一些参数，
// 接受了这些参数之后，
// 该函数并不会立即求值，
// 而是继续返回另外一个函数，
// 刚才传入的参数在函数形成的闭包中被保存起来。
// 待到函数被真正求值的时候，
// 之前传入的所有参数都会被一次性用于求值

var monthlyCost = 0;
var cost = (money) => (monthlyCost += money);
cost(100); // 第 1 天开销
cost(200); // 第 2 天开销
cost(300); // 第 3 天开销
cost(700); // 第 30 天开销
console.log(monthlyCost); // 输出: 600

/* 只想知道月的的时候一共花了多少 */

// 改写: 这是一个 curring 不完整的实现(因为包含了业务逻辑)
var cost = (function () {
  var args = [];
  return function () {
    if (arguments.length === 0) {
      var money = 0;
      for (var i = 0, l = args.length; i < l; i++) {
        money += args[i];
      }
      return money;
    } else {
      [].push.apply(args, arguments);
    }
  };
})();
cost(100);
cost(200);
cost(300);
console.log(cost()); // output: 600

// 一个真正通用的 currying
var currying = function (fn) {
  var args = [];
  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      return arguments.callee;
    }
  };
};

//  ➡️better code⬅️: var cost = () => Array.from(arguments).reduce((previous, current) => previous + current);
var cost = (function () {
  var money = 0;
  return function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i];
    }
    return money;
  };
})();

var costCurried = currying(cost); // 转化成 curring 函数

// 如果明确地带上参数，表示并不进行真正的求值计算
costCurried(100);
costCurried(200);
costCurried(300);
costCurried(); // => 600

// 如果明确地不带参数，表示进行真正的求值计算(利用前面保存的所有参数)
console.log(costCurried()); // output: 600

// more: 
// https://javascript.info/currying-partials
// https://medium.com/swlh/currying-in-javascript-bbe4ddedf86b
