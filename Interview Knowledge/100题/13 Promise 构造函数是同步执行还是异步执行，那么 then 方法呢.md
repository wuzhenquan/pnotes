 https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/19 

 promise构造函数是同步执行的，then方法是异步执行的 

看执行结果就知道了

```js
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})

promise.then(() => {
  console.log(3)
})

console.log(4)
```

