https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26

- 得先了解 event loop 的微任务和宏任务 https://juejin.im/post/5b73d7a6518825610072b42b
- 了解 api setImmediate
- 了解 api process.nextTick



差异体现在nodeV10之前
浏览器是执行完一个宏任务就会去清空微任务队列
node 则是将同源的宏任务队列执行完毕后再去清空微任务队列
另外,宏任务内若嵌套同源宏任务，仍会放进一个队列，但是执行将会放在下一次事件循环；（举个例子，timeoutTwo中包含一个timeoutThree，timeoutThree仍会放进setTimeout队列，但并不会与one、two一起执行完毕，而是等到清空微任务队列的下一次循环时执行）；