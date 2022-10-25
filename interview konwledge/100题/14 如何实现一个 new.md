https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/12

考查 

- new 时的具体过程
  1. 创建一个新对象
  2. 将 this 指向该对象
  3. 链接原型（将新对象的原型指向构造函数的原型）
  4. 返回对象（如果构造函数有返回对象，那么就返回构造函数的对象，如果没有就返回新对象）

```js
// ES5
function _new(){
  const obj = {}
  const Constructor = Array.prototype.shift.call(arguments)

  obj.__proto__ = Constructor.prototype // 链接原型
  const result = Constructor.apply(obj, arguments)

  return typeof result === 'object' ? result : obj
}
// ES6
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype) // obj.__proto__ = fn.prototype
    const ret = fn.apply(obj, arg)
    return ret instanceof Object ? ret : obj;
}
```

