DOM2和DOM3级模块有一下几类:

- DOM Level 2 Core
- DOM Level 2 Views
- DOM Level 2 Events(第13章再探讨)
- DOM Level 2 Style
- DOM Level 2 Traversal and Range
- DOM Level 2 HTML

"高程"P306的代码可以检查浏览器是否支持这些DOM模块



### 样式

- `element.style`返回一个类数组对象, 里面除了属性(css样式), 还有一些方法

- `element.style.backgroundImage`

- float是保留字, 改成cssFloat

- `element.style.cssText`返回的是什么

- `element.style.removeProperty("属性名")`

- 通过`element.style`无法访问和设置样式表层叠而来的元素.

  ​

