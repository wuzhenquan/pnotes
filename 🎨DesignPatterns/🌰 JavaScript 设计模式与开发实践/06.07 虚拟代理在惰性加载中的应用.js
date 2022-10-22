const miniConcole = (function () {
  let cache = [];

  // 当用户按下 F2 时，开始加载真正的 miniConsole.js
  const handler = function (ev) {
    if (ev.keyCode === 113) {
      const script = document.createElement("script");
      script.onload = function () {
        for (let i = 0, fn; (fn = cache[i++]); ) {
          fn();
        }
      };
      script.src = "miniConsole.js";
      document.getElementsByTagName("head")[0].appendChild(script);
      document.body.removeEventListener("keydown", handler); // 只加载一次 miniConsole.js
    }

    document.body.addEventListener("keydown", handler, false);

    return {
      log() {
        const args = arguments;
        cache.push(() => miniConcole.log.apply(miniConsole, args));
      },
    };
  };
})();

miniConcole.log(11); // 开始打印 log

// miniConsole.js, 真正的代码略
miniConsole = {
  log() {
    console.log(Array.prototype.join.call(arguments));
  },
};
