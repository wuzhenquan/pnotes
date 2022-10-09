// 在对象池工厂里，把创建对象的具体过程封装起来
// 实现一个通用的对象池

const objectPoolFactory = function (createObjFn) {
  let objectPool = [];

  return {
    create: function () {
      const obj = objectPool.length
        ? createObjFn.apply(this, arguments)
        : objectPool.shift();
      return obj;
    },
    recover: function (obj) {
      objectPool.push(obj);
    },
  };
};

// 现在利用 objextPoolFactory 来创建一个装载一些 iframe 的对象池
const iframeFactory = objectPoolFactory(function () {
  const iframe = document.createElement("iframe");
  document.body.appendChild(iframe);

  iframe.onload = function () {
    iframe.onload = null; // 防止 iframe 重复加载的 bug
    iframeFactory.recover(iframe); // iframe 加载完成之后回收节点
  };

  return iframe;
});

let iframe1 = iframeFactory.create();
iframe1.src = "http://baidu.com";

let iframe2 = iframeFactory.create();
iframe2.src = "http://QQ.com";

setTimeout(() => {
  let iframe3 = iframeFactory.create();
  iframe3.src = "http://163.xom";
}, 3000);
