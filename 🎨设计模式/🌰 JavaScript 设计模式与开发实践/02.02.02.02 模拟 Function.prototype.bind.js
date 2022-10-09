Function.prototype.bind = function () {
  // 1. 保存原函数
  const self = this;
  // 2. 绑定 this 上下文
  const context = [].shift.call(arguments); // 本例指的是 { name: "handsome boy" }
  // 3. 剩余的参数转成数组
  const bindArgs = [].slice.call(arguments); // 本例指的是 [1, 2]

  return function () {
    // 4. 把两次传入的参数合并起来
  	const firstAndsecondCallArgs = [...bindArgs, ...arguments]; // 本例指的是 [1, 2, 3, 4]
    return self.apply(context, firstAndsecondCallArgs);
  };
};

const obj = { name: "handsome boy" };
const func = function (a, b, c, d) {
  console.log(this.name);
  console.log([a, b, c, d]);
}.bind(obj, 1, 2); // => 'handsome boy' | [1, 2, 3, 4]

func(3, 4);
