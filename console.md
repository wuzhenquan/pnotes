分组

```
console.group('分组')
console.log('内容')
console.groupEnd()
```

计时

```
console.time()
console.timeEnd()
```

对象时空固定术

```JS
// 没固定，永远显示的是最新的对象数据
let a = { b: { c: 1 } }
a.b.c = 2
console.log(a)
a.b.c = 3

// 固定了
let a = { b: { c: 1 } }
a.b.c = 2
console.table(a)
a.b.c = 3
```

