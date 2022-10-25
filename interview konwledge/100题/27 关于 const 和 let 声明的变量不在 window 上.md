

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/30

var 声明 在 windows 上 

```js
var a = 12;
function f(){};
console.log(window.a); // 12
console.log(window.f); // f(){}
```

但 es6 不是这样

```js
let aa = 1;
const bb = 2;
console.log(window.aa); // undefined
console.log(window.bb); // undefined
```

在哪里？怎么获取？通过在设置断点，看看浏览器是怎么处理的：

[![letandconst](https://user-images.githubusercontent.com/20290821/53854366-2ec1a400-4004-11e9-8c62-5a1dd91b8a5b.png)](https://user-images.githubusercontent.com/20290821/53854366-2ec1a400-4004-11e9-8c62-5a1dd91b8a5b.png)

通过上图也可以看到，在全局作用域中，用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中

原因：

const和let会生成块级作用域，可以理解为

```js
let a = 10;
const b = 20;
相当于：
(function(){
         var  a = 10;
         var b = 20;
})()
```

ES5没有块级作用域的概念，只有函数作用域，可以近似理解成这样。
所以外层window必然无法访问。