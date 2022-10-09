/* ------------------------- 内部迭代器 ------------------------- */
const each = (ary, callback) => {
  for (let i = 0; i < ary.length; i++) {
    callback.call(null, ary[i], i); // 把下标和元素当作参数传给 callback 函数
  }
};

// 代码不好看 有请下一节的外部迭代器登场
const compare = (ary1, ary2) => {
  if (ary1.length !== ary2.length) throw new Error("ary1 和 ary2 不相等");

  each(ary1, (item, index) => {
    if (item !== ary2[index]) throw new Error("ary1 和 ary2 不相等");
  });

  console.log("ary1 和 ary2 相等");
};

compare([1, 2, 3], [1, 2, 3]);
