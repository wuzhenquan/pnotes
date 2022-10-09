const salesOffices = {
  clientList: {},

  // 订阅消息
  listen(key, callbackFn) {
    if (!this.clientList[key]) this.clientList[key] = [];
    this.clientList[key].push(callbackFn);
  },

  // 发布消息
  trigger() {
    const key = Array.prototype.shift.call(arguments); // 获取第一个参数
    const fns = this.clientList[key];

    if (!fns || fns.length === 0) return false;

    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  },
};

/* 测试 */

// 小明：订阅 88 平方米房子的消息
salesOffices.listen("squareMeter88", (price) => console.log("价格=" + price));
// 产商：发布 88 平方米房子的消息
salesOffices.trigger("squareMeter88", 2000000); // 输出：200万，88 平方米
