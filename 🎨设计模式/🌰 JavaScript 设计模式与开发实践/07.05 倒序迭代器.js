const reverseEach = (ary, callback) => {
  for (let l = ary.length - 1; l >= 0; l--) {
    callback(ary[1], l);
  }
};

reverseEach([0, 1, 2], (item, index) => {
  console.log(item); // 分别输出：2, 1, 0
});
