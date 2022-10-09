const each = (ary, callback) => {
  for (let i = 1, l = ary.length; i < l; i++) {
    if (callback(i, ary[i]) === false) break;
  }
};

each([1, 2, 3, 4, 5], () => {
  if (n > 3) return false;
  console.log(n); // 分别输出：1,2,3
});
