### Proxy的一个主要缺点是性能。

### 为什么要使用 Proxy？

Proxy 提供虚拟化接口来控制任何目标 Object的行为。这样做可以在简单性和实用性之间取得平衡，而不会牺牲兼容性。

也许使用`Proxy`的最令人信服的理由是，上面的许多示例只有几行，并且可以轻松组合以创建复杂的功能。最后一个例子，我们可以从几个用例中组合函数来创建一个只读`cookie`对象，该对象返回不存在或“私有”隐藏cookie的默认值。

### what

```js
var proxy = new Proxy(target, handler);
```

`Proxy`对象的所有用法，都是上面的这种形式。不同的只是`handle`参数的写法。

最简单的例子

```js
let target = {
    x: 10,
    y: 20
};

let hanler = {
    get: (obj, prop) => 42
};

target = new Proxy(target, hanler);

target.x; // 42
target.y; // 42
target.x; // 42
```



- handler.get
- handler.set
- handler.has
- handler.apply
- handler.construct
- handler.ownKeys
- handler.deleteProperty
- handler.defineProperty
- handler.isExtensible
- handler.preventExtensions
- handler.getPrototypeOf
- handler.setPrototypeOf
- handler.getOwnPropertyDescriptor

## 用处

### 设置类似 go 语言的零值

```js
const withZeroValue = (target, zeroValue) =>
    new Proxy(target, {
        get: (obj, prop) => (prop in obj ? obj[prop] : zeroValue)
    });
let pos = {
    x: 4,
    y: 19
};
console.log(pos.x, pos.y, pos.z); // 4, 19, undefined
pos = withZeroValue(pos, 0);
console.log(pos.z, pos.y, pos.z); // 4, 19, 0
```

### 负索引数组

替代 `arr[arr.length-1]`

```js

const negativeArray = els =>
  new Proxy(els, {
      get: (target, propKey, receiver) =>
        Reflect.get(
          target,
            +propKey < 0 ? String(target.length + +propKey) : propKey,
            receiver
      )
});
const unicorn = negativeArray(["🐴", "🎂", "🌈"]);
unicorn[-1]; // '🌈'
```

### 隐藏属性

之前的管理是属性名前有下划线 `_` 的就认为是私有（隐藏）属性，不要访问的意思。

之后可以用 Symbol 了，起初 Symbol 是为了启用私有属性而引入的。

再后来 `Object.getOwnPropertySymbols` 

现在用 Proxy，可以无法通过枚举，克隆，访问或修改来访问。

```js
const hide = (target, prefix = "_") =>
  new Proxy(target, {
    has: (obj, prop) => !prop.startsWith(prefix) && prop in obj,
    ownKeys: obj =>
      Reflect.ownKeys(obj).filter(
        prop => typeof prop !== "string" || !prop.startsWith(prefix)
      ),
    get: (obj, prop, rec) => (prop in rec ? obj[prop] : undefined)
  });
let userData = hide({
  firstName: "Tom",
  mediumHandle: "@tbarrasso",
  _favoriteRapper: "Drake"
});

userData._favoriteRapper(
  // undefined
  "_favoriteRapper" in userData
); // false
```

### 缓存

```js
// 这个示例简单地使银行帐户余额在10秒后无法访问。
const ephemeral = (target, ttl = 60) => {
    const CREATED_AT = Date.now();
    const isExpired = () => Date.now() - CREATED_AT > ttl * 1000;

    return new Proxy(target, {
        get: (obj, prop) => (isExpired() ? undefined : Reflect.get(obj, prop))
    });
};
let bankAccount = ephemeral(    {        balance: 14.93    },    10);
console.log(bankAccount.balance); // 14.93
setTimeout(() => {  
  console.log(bankAccount.balance); // 十秒后打印 bankAccount.balance 是 undefined
}, 10 * 1000);
```

### 让对象为只读

```js
const NOPE = () => {
    throw new Error("Can't modify read-only view");
};

const NOPE_HANDLER = {
    set: NOPE,
    defineProperty: NOPE,
    deleteProperty: NOPE,
    preventExtensions: NOPE,
    setPrototypeOf: NOPE
};

const readOnlyView = target => new Proxy(target, NOPE_HANDLER);
let data = readOnlyView({name:'jay'})
console.log(data) // { name: 'jay' }
delete data.name  // Error: Can't modify read-only view
```

### 枚举不存在提示异常

尝试访问不存在的属性现在不是返回`undefined`，而是会抛出异常。这使得在早期捕获和解决问题变得更加容易。

```js
const createEnum = target =>
    readOnlyView(
        new Proxy(target, {
            get: (obj, prop) => {
                if (prop in obj) {
                    return Reflect.get(obj, prop);
                }
                throw new ReferenceError(`Unknown prop "${prop}"`);
            }
        })
    );
let SHIRT_SIZES = createEnum({S: 10, M: 15, L: 20});
SHIRT_SIZES.S; // 10
SHIRT_SIZES.XL; // Uncaught ReferenceError: Unknown prop "XL"
```

### 运算符重载（最吸引人）

```js
// 语法上最优雅的重载操作符

// 重载 in 运算符
const range = (min, max) =>
  new Proxy(Object.create(null), {
    has: (_, prop) => +prop >= min && +prop <= max
  });
const X = 10.5;
const nums = [1, 5, X, 50, 100];
X in range(1, 100) // true
nums.filter(n => n in range(1, 10)); // [1, 5]

// 重载 delete 运算符
// 面试，那么你来写一个好了
// 重载 new 运算符
// 面试，那么你来写一个好了
```

### 处理 cookie

```js
const getCookieObject = () => {
  const cookies = document.cookie.split(';').reduce(
    (cks, ck) => ({
      [ck.substr(0, ck.indexOf('=')).trim()]: ck.substr(ck.indexOf('=') + 1),
      ...cks
    }),
    {}
  )
  const setCookie = (name, val) => (document.cookie = `${name}=${val}`)
  const deleteCookie = name =>
    (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`)

  return new Proxy(cookies, {
    set: (obj, prop, val) => (setCookie(prop, val), Reflect.set(obj, prop, val)),
    deleteProperty: (obj, prop) => (deleteCookie(prop), Reflect.deleteProperty(obj, prop))
  })
}

let docCookies = getCookieObject();
docCookies.has_recent_activity; // "1"
docCookies.has_recent_activity = "2"; // "2"
delete docCookies2["has_recent_activity"]; // true

```

参考

https://mp.weixin.qq.com/s/NzZ7oiX4I3JfIYHjuxkIhQ