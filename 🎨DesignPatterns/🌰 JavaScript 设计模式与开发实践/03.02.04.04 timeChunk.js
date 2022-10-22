// 第一个参数是创建节点需要用到的数据
// 第二个参数是封装了创建节点逻辑的函数
// 第三个参数表示每一批创建的节点数量
const timeChunk = function (ary, fn, count = 1) {
  let start = () => {
    for (let i = 0; i < Math.min(count, ary.length); i++) {
      fn(ary.shift());
    }
  };
  return () => {
    const intervalID = setInterval(function () {
      if (ary.length === 0) return clearInterval(intervalID);
      start();
    }, 1000);
  };
};

// test:
// 假设我们有 1000 个好友的数据
// 利用 timeChunk 函数 每一批只往页面中创建 8 个节点

const renderFriendList = timeChunk(
  Array.from({ length: 1000 }, (_, i) => i + 1), // an array containing 1...1000
  (n) => {
    let div = document.createElement("div");
    div.innerHTML = n;
    document.body.appendChild(div);
  },
  8
);
renderFriendList();
