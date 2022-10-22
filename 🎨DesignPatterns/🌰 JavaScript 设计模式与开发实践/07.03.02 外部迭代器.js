/* ------------------------- 外部迭代器 ------------------------- */
class Iterator {
  constructor(arr) {
    this.current = 0;
    this.arr = arr;
  }
  next() {
    return (this.current += 1);
  }
  isDone() {
    return this.current >= this.arr.length;
  }
  getCurrItem() {
    return this.arr[this.current];
  }
}

const compare = function (iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      throw new Error("iterator1 和 iterator2 不相等");
    }
    iterator1.next();
    iterator2.next();
  }
  console.log("iterator1 和 iterator2 相等");
};

const iterator1 = new Iterator([1, 2, 3]);
const iterator2 = new Iterator([1, 2, 3]);
compare(iterator1, iterator2); // => iterator1 和 iterator2 相等
