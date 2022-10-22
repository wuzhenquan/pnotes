// Event 可以把 listener 和 trigger 联系起来
const Event = (function () {
  let clientList = {};

  return {
    listen: (key, fn) => {
      if (!clientList[key]) clientList[key] = [];
      clientList[key].push(fn); // 订阅者的消息添加进缓存列表
    },

    trigger: function () {
      const key = Array.prototype.shift.call(arguments);
      const fns = clientList[key];

      if (!fns || fns.length === 0) return false;

      for (let i = 0, fn; (fn = fns[i++]); ) {
        fn.apply(this, arguments);
      }
    },

    remove: (key, fn) => {
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
})();

Event.listen("squareMeter88", (price) => {
  console.log("价格=" + price);
});

Event.trigger("squareMeter88", 2000000);
