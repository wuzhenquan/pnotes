> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/6

[我的笔记](https://github.com/wuzhenquan/Notes/blob/master/JavaScript%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9/ES6/Map%20Set%20WeakMap%20WeakSet.xmind)


Map:`字典`  `键值对的集合` `可以遍历`

Set: `集合` `成员不能重复` `只有键值，没有键名，有点类似数组` `可以遍历`

WeakMap: `只接受对象作为健名`  `键名所指向的对象，不计入垃圾回收机制` `不能遍历`

WeakSet: `成员都是对象` `成员都是弱引用` `不能遍历`



什么情况下用什么比较好？

Map：**数据重组** 和 **数据储存** . [Filter anagrams](http://javascript.info/map-set#filter-anagrams)

Set：**数据重组** 和 **数据储存**. 并集（Union）、交集（Intersect）和差集，[remember visitors](http://javascript.info/map-set#set)，[unique array members](http://javascript.info/map-set#filter-unique-array-members)

WeakMap: [keeps a visit count for users](http://javascript.info/weakmap-weakset#use-case-additional-data), [caching](http://javascript.info/weakmap-weakset#use-case-caching), [Store read dates](http://javascript.info/weakmap-weakset#store-read-dates)

WeakSet：[who visited our site](http://javascript.info/weakmap-weakset#weakset), [Store "unread" flags](http://javascript.info/weakmap-weakset#store-unread-flags)

### Set

`新的数据结构` `构造函数`

`Set.prototype.constructor` `Set.prototype.size` `Set.prototype.add(value)`  `Set.prototype.delete(value)` `Set.prototype.has(value)` `Set.prototype.clear()` 

```js
const set = new Set([1, 2, 3, 4, 4]);
[...set]
set.size
```

```js
// 去除数组的重复成员
[...new Set([1,2,2,3,4,5])]
Array.from(new Set([1,2,2,3,4,5]))
// 去除字符串里的重复字符
[...new Set('ababbc')].join('')
Array.from(new Set('ababbc')).join('')
```

```js
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x))
for (let i of s) { console.log(i) } // 2 3 5 4
```

`Set.prototype.keys()` `Set.prototype.values()` `Set.prototype.entries()` `Set.prototype.forEach()`

```js
let set = new Set(['red', 'green', 'blue']);
for (let x of set) {
  console.log(x);
}
// red
// green
// blue
for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

并集（Union）、交集（Intersect）和差集

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```
### Map

Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

方法：Map.prototype.size/set/get/delete/has/delete/keys/values/entries/forEach

Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

```js
// 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

Map 转为数组/数组转为 Map/Map 转为对象/对象转为 Map/Map 转为 JSON/JSON 转为 Map

### WeakMap

与 Map 的区别

- `WeakMap`只接受对象作为键名
- 它的键名所引用的对象都是弱引用
- 没有遍历操作（即没有`keys()`、`values()`和`entries()`方法），也没有`size`属性, 也没有 clear 方法.
### WeakSet

与 set 的区别

- WeakSet 的成员**只能是对象**，而不能是其他类型的值。
- WeakSet 中的对象都是弱引用

[实例用法]([http://es6.ruanyifeng.com/#docs/set-map#%E8%AF%AD%E6%B3%95](http://es6.ruanyifeng.com/#docs/set-map#语法))

