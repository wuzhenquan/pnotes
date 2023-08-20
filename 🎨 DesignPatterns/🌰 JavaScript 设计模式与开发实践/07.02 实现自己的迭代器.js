const each = function (ary, callback) {
  for (var i = 0; i < ary.length; i++) {
    callback.call(ary[i], i, ary[i]);
  }
};
each([1, 2, 3], (index, item) => console.log([index, item]));
// output
// [ 0, 1 ]
// [ 1, 2 ]
// [ 2, 3 ]
