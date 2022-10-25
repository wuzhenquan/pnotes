#### 解析 get 参数

通过 `replace` 方法获取 `url` 中的参数键值对，可以快速解析 `get` 参数。

```
const q = {};
location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
console.log(q);
```

#### 解析连接 url

可以通过创建 `a` 标签，给 `a` 标签赋值 `href` 属性的方式，获取到协议，`pathname`，`origin` 等 `location` 对象上的属性。

```
// 创建a标签
const aEle = document.createElement('a');
// 给a标签赋值href路径
aEle.href = '/test.html';
// 访问aEle中的属性
aEle.protocol; // 获取协议
aEle.pathname; // 获取path
aEle.origin;
aEle.host;
aEle.search;
```