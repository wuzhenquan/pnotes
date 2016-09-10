Promise 构造函数接受一个 `function(resolve, reject){}` 作为参数

- Promise 有两种状态变化
  - 从 Pending 变为 Resolved
  - 从 Pending 变为 Rejected
- new 一个 Promise, 实际上就是创建一个这样的对象: `Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: "hello promise"}`, 其中, 属性 PromiseStatus 的属性值优 resolve 或者 reject 函数决定, 属性 PromiseValue 的属性值由 resolve 或者 reject 函数所带的值决定.

新建一个 promise 实例

```javascript
var promise = new Promise((resolve,reject)=>{
  // resolve 和 reject 是两个函数
  // 想让 Promise 从 Pending 变为 Resolved, 用 resolve(), 所带参数是 Promise 对象中 PromiseValue 属性的值
  // 想让 Promise 从 Pending 变为 Rejected, 用 reject(), 所带参数是 Promise 对象中 PromiseValue 属性的值
});
```

- resolve 
  - 是一个函数

  - 将 Promise 对象的状态从 Pending 变为 Resolved

  - 在异步操作成功时调用并将结果作为参数传递出去

  - ```javascript
    var p1 = new Promise(function(resolve, reject){
        resolve('hello promise')
    });
    console.log(p1);
    //Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: "hello promise"}
    ```
- reject 
  - 是一个函数

  - 将 Promise 对象的状态从 Pending 变为 Rejected 

  - 在异步操作失败时调用, 并将异步操作报出的错误作为参数传递出去

  - ```javascript
    // 好难理解
    var p1 = new Promise(function(resolve, reject){
      setTimeout(() => reject(new Error('fail')), 3000);
    });
    var p2 = new Promise(function(resolve, reject){
      setTimeout(() => resolve(p1), 1000);
    })
    p2.then(result => console.log(result));
    p2.catch(error => resolve(p1), 1000)
    // p1 是个 Promise , 3秒之后变为 Rejected. p2的状态由 p1 决定, 1秒之后, p2 调用 resolved 方法, 但是此时 p1 的状态还没有改变, 因此 p2 的状态也不会改变. 又过了 2 秒, p1 变为 Rejected , p2 也跟着变为 Rejected. 
    ```

then 方法, 指定 Resolved 状态和 Rejected 状态的回调函数,  当从 Pending 切换到 Resolved 或者 Rejected 时, 调用 then 方法里面的回调函数. then 方法可以接受两个回调函数作为参数:

- 状态变为 Resolved 时调用
- 状态变为 Rejected 时调用
- then 方法返回的是一个新的 Promise 实例
- Promise 的实例状态变为 Resolved, 就会触发 then 绑定的回调函数
- then 绑定的回调函数的参数是对应的 resolve 或 reject 函数的参数? 









































