Promise 构造函数接受一个 `function(resolve, reject){}` 作为参数

- resolve 是一个函数
  - 将 Promise 对象的状态从 Pending 变为 Resolved
  - 在异步操作成功时调用并将结果作为参数传递出去

then 方法, 指定 Resolved 状态和 Rejected 状态的回调函数,  当从 Pending 切换到 Resolved 或者 Rejected 时, 调用 then 方法里面的回调函数. then 方法可以接受两个回调函数作为参数:

- 状态变为 Resolved 时调用
- 状态变为 Rejected 时调用
- ​









































