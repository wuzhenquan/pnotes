// 在上一节的职责链模式中，
// 我们让每个节点函数同步返回一个特定的值“nextSuccessor”，
// 来表示是否把请求传递给下一个节点。
// 然而在现实开发中，我们经常会遇到一些异步的问题，
// 比如我们要在节点函数中发起一个 ajax 异步请求，
// 异步请求的结果才能决定是否继续在职责链中 passRequest。
// 这时候让节点函数返回“nextSuccessor”已经没有意义了，
// 所以要给 Chain 类再增加一个原型方法 Chain.prototype.next，
// 表示手动传递请求给职责链中的下一个节点。

const Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor);
};

Chain.prototype.passRequest = function () {
  const ret = this.fn.apply(this, arguments);

  if (ret === "nextSuccessor") {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    );
  }

  return ret;
};

/* ⬇️ */
Chain.prototype.next = function () {
  return (
    this.successor &&
    this.successor.passRequest.apply(this.successor, arguments)
  );
};
/* ⬆️ */

const fn1 = new Chain(function () {
  console.log(1);
  return "nextSuccessor";
});

const fn2 = new Chain(function () {
  console.log(2);
  setTimeout(() => this.next(), 1000);
});

const fn3 = new Chain(function () {
  console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
