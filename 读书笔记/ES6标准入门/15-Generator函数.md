Generator 函数特征:

- 有个`*`号, 例如`function* helloWorldGenerator(){}`
- 用 yield 定义不同的内部状态

```javascript
function* helloWorldGenerator(){
  yield 'hello';
  yield 'world';
  return 'ending';
}
// 调用但不会被执行, 返回的不是函数运行的结果, 而是一个指向内部状态的指针对象
var hw = helloWorldGenerator();
//
hw.next() // {value: 'hello', done: false}
hw.next() // {value: 'world', done: false}
hw.next() // {value: 'ending', done: true}
hw.next() // {value: undefined, done: true}
```

yield 语句和 return 语句

- 相似之处: 都能放回紧跟在语句后的表达式的值


- 区别1:  return 不具备位置记忆功能
- 区别2:  yield 可以执行多次, return 只能执行一次
- 区别3:  yield 可以返回多个值, return 只能返回一个值

yield 语句总是返回 undefined, yield 语句只是将 yield 后的表达式的值作为将要返回对象的 value  属性值. 