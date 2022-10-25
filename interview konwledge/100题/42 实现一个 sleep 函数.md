https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/63

实现一个 sleep 函数，比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现



```js
//1. Promise
const sleep1 = time => new Promise(resolve => setTimeout(resolve, time));

//2.without Promise
const sleep2 = time => ({
  then: cb => {
    setTimeout(cb, time);
  }
});

//3. Generator, without Promise code
const sleep3 = time => {
  function* gen() {
    yield {
      then: cb => {
        setTimeout(cb, time);
      }
    };
  }
  return gen().next().value;
};

//4. async/await without Promise code and Generator
const sleep4 = async time=>{
    await sleep2(time);
}

//call
(async ()=>{
    console.time('sleep1');
    await sleep1(1000);
    console.timeEnd('sleep1');

    console.time('sleep2');
    await sleep2(1000);
    console.timeEnd('sleep2');

    console.time('sleep3');
    await sleep3(1000);
    console.timeEnd('sleep3');

    console.time('sleep4');
    await sleep4(1000);
    console.timeEnd('sleep4');
})();

//typeof callback === "hell"
```



这个答案很有意思：

[sleep实现无外乎同步和异步两种方法。同步可以用for循环或者while让它在等待时间内啥也不干；异步就是利用setTimeout来做定时。如果后序处理很复杂，可以考虑结合promise来实现。毕竟，promise解决回调地狱之类的问题还是很有一套的。代码就不贴了，上面都是。免得搞一大片的重复代码，实在没啥必要。](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/63#issuecomment-511136488) 

[什么是sleep? 什么实现用Promise 或是 async await的方法和setTimeout有本质上的区别吗? sleep不应该用代码的方式 阻塞住进程,让他啥也干不了吗?](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/63#issuecomment-523328562) 