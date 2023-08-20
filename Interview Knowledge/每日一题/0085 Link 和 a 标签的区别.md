> 第 85 题：react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别，如何禁掉 `<a>` 标签默认事件，禁掉之后如何实现跳转。

Link 是用于路由跳转的组件，组件里封装了 a 标签，但是再 Link 上还有很多方法比如 to/replace 等。

禁掉  `<a>` 标签默认事件：`<a href="javascript:void(0)"></a>`

禁掉之后如何实现跳转: `window.location.href = url`

