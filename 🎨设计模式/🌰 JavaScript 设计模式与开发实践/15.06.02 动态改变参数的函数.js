Function.prototype.before = function (beforefn) {
  const _self = this;
  return function () {
    beforefn.apply(this, arguments);
    return _self.apply(this, arguments);
  };
};

// 通过 Function.protype.before 给函数 func 的参数 param 动态地添加属性 b：
// 当我们在 beforefn 的函数体内改变 arguments 的时候，原函数 __self 接收的参数列表自然也会变化
let func = param => console.log(param);
func = func.before(param => param.b = "b");
func({ a: "a" }); // 输出：{ a: "a", b: "b" }

// 下面的代码，
// 可能有的项目就不需要带 token，
// 所以对其他项目来说 token 是多余的
let ajax = (type, url, param) => console.dir(param);
const getToken = () => "Token";
ajax = function (type, url, param = {}) {
  param = { ...param, token: getToken() };
  console.dir(param);
};
ajax("get", "http: //xxx.com/useinfo", { name: "sven" });

// 改写
// 用 AOP 的方式给 ajax 函数动态装饰上了 token 参数，
// 保证了 ajax 是一个相对纯净的函数，
// 提高了 ajax 函数的可复用性，
// 如果 ajax 被迁往其他项目，则不需要做任何修改
let ajax = (type, url, param) => console.dir(param);
const getToken = () => "Token";
ajax = ajax.before((type, url, param) => (param.token = getToken()));
ajax("get", "http: //xxx.com/useinfo", { name: "sven" });
