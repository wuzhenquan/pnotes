const Event = (function () {
  const Event = (function () {
    let namespaceCache = {};

    const each = (ary, fn) => {
      for (let i = 0, l = ary.length; i < l; i++) {
        return fn.call(ary[i], i, ary[i]);
      }
    };

    const _remove = function (key, cache, fn) {
      if (!cache[key]) return;
      if (fn) {
        for (let i = cache[key].length; i >= 0; i--) {
          if (cache[key][i] === fn) cache[key].splice(i, 1);
        }
      } else {
        cache[key] = [];
      }
    };

    const _trigger = function () {
      const cache = Array.prototype.shift.call(arguments);
      const key = Array.prototype.shift.call(arguments);
      const args = arguments;
      const _self = this;
      const stack = cache[key];
      if (!stack || !stack.length) return;
      return each(stack, function () {
        this.apply(_self, args);
      });
    };

    const _create = function (namespace = "default") {
      let cache = {};
      let offlineStack = []; // 离线事件

      const ret = {
        listen: function (key, fn, last) {
          if (!cache[key]) cache[key] = [];
          cache[key].push(fn);

          if (offlineStack === null) return;

          if (last === "last") offlineStack.length && offlineStack.pop()();
          else
            each(offlineStack, function () {
              this();
            });

          offlineStack = null;
        },
        one: function (key, fn, lash) {
          _remove(key, cache);
          this.listen(key, fn, last);
        },
        remove: function (key, fn) {
          _remove(key, cache, fn);
        },
        trigger: function () {
          const _self = this,
            args = arguments;
          Array.prototype.unshift.call(arguments, cache);
          fn = function () {
            return _trigger.apply(_self, args);
          };
          if (offlineStack) return offlineStack.push(fn);
          return fn();
        },
      };

      return namespace
        ? namespaceCache[namespace]
          ? namespaceCache[namespace]
          : (namespaceCache[namespace] = ret)
        : ret;
    };

    return {
      create: _create,
      one: function (key, fn, lash) {
        this.create().one(key, fn, lash);
      },
      remove: function (key, fn) {
        this.create().remove(key, fn);
      },
      listen: function (key, fn, last) {
        this.create().listen(key, fn, last);
      },
      trigger: function () {
        this.create().trigger.apply(this, arguments);
      },
    };
  })();

  return Event;
})();

// 测试
/* ------------------------- 先发布后订阅 ------------------------- */
Event.trigger("click", 1);
Event.listen("click", function (a) {
  console.log(a);
}); // 输出 1

// /* ------------------------- 使用命名空间 ------------------------- */
Event.create("namespace1").listen("click", (a) => console.log(a)); // 输出 1
Event.create("namespace1").trigger("click", 1);

Event.create("namespace2").listen("click", (a) => console.log(a)); // 输出 2
Event.create("namespace2").trigger("click", 2);
