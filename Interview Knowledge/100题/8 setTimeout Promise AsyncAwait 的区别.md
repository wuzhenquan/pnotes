https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/33

主要是考查

- 这三者在事件循环中的区别
- [执行栈基础知识](https://github.com/FoooooooF/FrontEnd-Knowledge-Point/blob/master/kernel/event_loop.md)
  - 上下文执行栈
  - Event Loop
  - task queue
  - Microtask
  - Macrotask

事件循环

- 宏任务队列（setTimeout 的回调函数）
- 微任务队列（promise.then 的回调函数, await 后的表达式）

##### setTimeout 的回调函数

- 放到宏任务队列里

- 执行栈清空以后执行

##### promise.then 的回调函数（then 或 catch)

- 放到相应宏任务的微任务队列里
- 宏任务里的**同步代码**执行完再执行，优先于宏任务里的异步代码

##### await 后面跟的表达式

- 放到微任务队列里
- 让出了线程，跳出了 async 函数体



```js
 // 今日头条面试题
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
// 解题方法，先分清哪些打印代码是同步代码，哪些打印代码是微任务队列后的，哪些代码是宏任务队列后的
```

