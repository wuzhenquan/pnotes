// 先定义一个获取小气泡节点的工厂，作为对象池的数组成为私有属性被包含在工厂闭包里
// 这个工厂有两个暴露对外的方法
// create 表示获取一个 div 节点
// recover 表示回收一个 div 节点
const toolTipFactory = (function () {
  let toolTipPool = []; // toolTip 对象池

  return {
    create: function () {
      if (!toolTipPool.length) {
        // 如果为空则创建一个 dom
        const div = document.createElement("div");
        document.body.appendChild(div);
        return div;
      } else {
        // 如果不为空则从对象池中取出一个 dom
        return toolTipPool.shift();
      }
    },
    recover: function (toolTipDom) {
      return toolTipPool.push(toolTipDom); // 对象池回收 dom
    },
  };
})();

// 现在把时钟拨回进行第一次搜索的时刻，
// 目前需要创建 2 个小气泡节点，
// 为了方便回收，用一个数组 ary 来记录它们
let ary = [];
for (let i = 0, str; (str = ["A", "B"][i++]); ) {
  let toolTip = toolTipFactory.create();
  toolTip.innerHTML = str;
  ary.push(toolTip);
}

// 接下来假设地图需要重新开始绘制，
// 在此之前要把这两个节点回收进对象池
for (let i = 0, toolTip; (toolTip = ary[i++]); ) {
  toolTipFactory.recover(toolTip);
}

// 创建 6 个小气泡
// 再测试一番，页面中出现了内容分别为 'A', 'B', 'C', 'D', 'E', 'F' 的 6 个节点，
// 上一次创建好的节点被共享给了下一次操作
for (let i = 0, str; (str = ["A", "B", "C", "D", "E", "F"][i++]); ) {
  let toolTip = toolTipFactory.create();
  toolTip.innerHTML = str;
}
