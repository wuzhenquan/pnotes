const eventObj = {
  clientList: {},
  listen(key, fn) {
    if (!this.clientList[key]) this.clientList[key] = [];
    this.clientList[key].push(fn);
  },
  trigger() {
    const key = Array.prototype.shift.call(arguments);
    const fns = this.clientList[key];
    if (!fns || fns.length === 0) return false;
    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  },
  // 取消订阅事件
  remove(key, fn) {
    const fns = this.clientList[key];
    if (!fns) return false;
    if (!fn && fns) return fns.length === 0; // 取消 key 对应消息的所有订阅

    // 反向遍历订阅的回调函数列表
    for (let l = fns.length - 1; l >= 0; l--) {
      let _fn = fns[l];
      if (_fn === fn) fns.splice(l, 1); // 删除订阅者的回调函数
    }
  },
};

// 给对象添加 eventObj 里的功能(其实就是复制一遍 key)
const installEvent = (obj) => {
  for (let i in eventObj) obj[i] = eventObj[i];
};

// 测试
let salesOffices = {};
installEvent(salesOffices);
salesOffices.listen(
  "squareMeter88",
  (fn1 = (price) => console.log("价格=" + price))
);
salesOffices.remove("squareMeter88", fn1); // 删除小明的订阅
salesOffices.trigger("squareMeter88", 200); // false
