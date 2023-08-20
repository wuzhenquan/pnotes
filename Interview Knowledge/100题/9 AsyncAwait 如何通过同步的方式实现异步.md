https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/156

async awiat 是一种语法糖，基于Generator 函数和自动执行器实现 

Generator之所以可以通过同步实现异步是它具有暂停执行和恢复执行的特性和函数体内外的数据交换和错误处理机制。 

看看一个 async/await 可以引出多少个知识点

-   `Generator` 又依赖于迭代器`Iterator` 
-   `Iterator` 的思想呢又来源于单向链表

所以知识点有

- 单向链表
- Iterator
- Generator + 自动执行器

###  单向链表 

 一个单向链表包含两个值: 当前节点的值和一个指向下一个节点的链接， 这个链接指向列表中的下一个节点，而最后一个节点则指向一个空值。 

### Iterator

遍历过程(类似于单向链表)：

- 创建一个**指针对象**，指向当前数据结构的起始位置
- 第一次调用指针对象的 `next` 方法，将指针指向数据结构的第一个成员
- 第二次调用指针对象的 `next` 方法，将指针指向数据结构的第二个成员
- 不断的调用指针对象的 `next` 方法，直到它指向数据结构的结束位置

一个对象要变成 Iterable 的

-  对象必须有一个名字是 `Symbol.iterator` 的属性
-  [Symbol.iterator]  
  - 返回一个无参函数
  - 函数符合迭代器协议
-  迭代器协议：产生一个有限或无限序列的值，并且当所有的值都已经被迭代后，就会有一个默认的返回值 

什么样的对象是 Iterator

- 有 `next()` 方法，返回 `{done: boolean, value}`

```js
// 写一个迭代器
const makeIterator = arr => {
  let nextIndex = 0;
  return {
    next: () =>
      nextIndex < arr.length
        ? { value: arr[nextIndex++], done: false }
        : { value: undefined, done: true },
  };
};
const it = makeIterator(['人月', '神话']);
console.log(it.next()); // { value: "人月", done: false }
console.log(it.next()); // { value: "神话", done: false }
console.log(it.next()); // {value: undefined, done: true }
// 写一个可迭代对象
const myIterable = {};
myIterable[Symbol.iterator] = function*() {
  yield 1;
  yield 2;
  yield 3;
};

for (let value of myIterable) {
  console.log(value);
}
// 1
// 2
// 3

//or

console.log([...myIterable]); // [1, 2, 3]
```

### Generator

Generator 返回一个生成器对象，这个生成器对象既是 Iterable 的也是 Iterator

```js
function* another() {
  yield '人月神话';
}
function* gen() {
  yield* another(); // 移交执行权
  const a = yield 'hello';
  const b = yield a; // a='world' 是 next('world') 传参赋值给了上一个 yield 'hello' 的左值
  yield b; // b=！ 是 next('！') 传参赋值给了上一个 yidle a 的左值
}
const g = gen();
g.next(); // {value: "人月神话", done: false}
g.next(); // {value: "hello", done: false}
g.next('world'); // {value: "world", done: false} 将 'world' 赋给上一条 yield 'hello' 的左值，即执行 a='world'，
g.next('!'); // {value: "!", done: false} 将 '!' 赋给上一条 yield a 的左值，即执行 b='!'，返回 b
g.next(); // {value: undefined, done: false}
```

没有自动执行器，Generator 和 callback 结合实现的异步，仍需要手动执行 .then 层层添加回调

```js
const promisify = require('util').promisify;
const path = require('path');
const fs = require('fs');
const readFile = promisify(fs.readFile);

// 自动执行器
function run(gen) {
  const g = gen();
  function next(data) {
    const res = g.next(data);
    // 深度递归，只要 `Generator` 函数还没执行到最后一步，`next` 函数就调用自身
    if (res.done) return res.value;
    res.value.then(function(data) {
      next(data);
    });
  }
  next();
}
run(function*() {
  const res1 = yield readFile(path.resolve(__dirname, '../data/a.json'), { encoding: 'utf8' });
  console.log(res1);
  // {
  //   "a": 1
  // }
  const res2 = yield readFile(path.resolve(__dirname, '../data/b.json'), { encoding: 'utf8' });
  console.log(res2);
  // {
  //   "b": 2
  // }
});
```

另一个 Generator + 自执行器 的例子

```js
// 等 10 秒后看结果
function get(val) {
  return new Promise((resolve, reject)=>{
    console.log(`正在加载${val}`);
    setTimeout(()=>{
      resolve(val);
      console.log(`${val}加载完毕`);
    },5000 + Math.random() * 10000);
  });
}

function * g() {
  var five = yield get(5);
  var seven = yield get(7);
  var eleven = yield get(11);
  return five + seven + eleven;
}

function run(g) {
  return new Promise((resolve, reject)=>{
    var iterator = g();
    var generated;
    start();
    function start(value) {
      generated = iterator.next(value);
      if(!generated.done){
        generated.value.then(data=>{
          start(data);
        });
      }else {
        resolve(generated.value);
      }
    }
  });
}

run(g).then(console.log);
```



### Async/Await

 `async/await` 是 `Generator` 的语法糖 

对比

```js
// Generator
run(function*() {
  const res1 = yield readFile(path.resolve(__dirname, '../data/a.json'), { encoding: 'utf8' });
  console.log(res1);
  const res2 = yield readFile(path.resolve(__dirname, '../data/b.json'), { encoding: 'utf8' });
  console.log(res2);
});

// async/await
const readFile = async ()=>{
  const res1 = await readFile(path.resolve(__dirname, '../data/a.json'), { encoding: 'utf8' });
  console.log(res1);
  const res2 = await readFile(path.resolve(__dirname, '../data/b.json'), { encoding: 'utf8' });
  console.log(res2);
  return 'done'；
}
const res = readFile();
```

-  `async function` 代替了 `function*` 
-  `await` 代替了 `yield` 
-  无需自己手写一个自动执行器 `run` 