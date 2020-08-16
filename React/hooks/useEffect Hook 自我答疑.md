## useEffect Hook 的目的是什么

简单来说，useEffect 就是让我们 perform side effects in a component. 

应用一：fetching some data

应用二：listening for upcoming events.

## 所谓的副作用 side effects 是什么

是一个在处理完一些事件之后需要我们执行的一些逻辑。

数据获取、设置订阅、手动更更新 React 组件都是执行 side deffect 的例子。

## 什么是 dependencies

useEffect 的第二个参数，作用是让第一个 callback  参数 runs only if some of the dependencies change。

## 不要对 Dependencies 撒谎

**什么叫对 Dependencies 撒谎？**

useEffect 第一个参数内部使用了外部某个变量，却没有申明在 Dependencies 里。

**为什么不要对 Dependencies 撒谎？**

因为 useEffect 符合 Capture Value 的特性。

**解决方法** 

解决方法1： [using ‘updater’ function inside the setter](https://codesandbox.io/s/counterusingstateupdater-5ynwv)

解决方法2： [“useRef” to the rescue](https://codesandbox.io/s/counterusingref-ekdzd?file=/src/index.js) 

如何检查？ [lint rule](https://github.com/facebook/react/issues/14920) 

**参考**

重点看这个：[Don’t Lie to React About Dependencies](https://overreacted.io/a-complete-guide-to-useeffect/#dont-lie-to-react-about-dependencies) 

不传第二个参数的代价：[example here](https://codesandbox.io/s/countewithoutdeps-0ptoo?file=/src/index.js), that will  run after first render and after each update

[不要撒谎](https://juejin.im/post/5c9827745188250ff85afe50#heading-10) 

[诚实的代价](https://juejin.im/post/5c9827745188250ff85afe50#heading-11)  

[怎么既诚实又高效呢？](https://juejin.im/post/5c9827745188250ff85afe50#heading-10) 

## 为什么 `useEffect(fn, [])` 不能等同于 `componentDidMount` ？

hook是从「生命周期和时间」的思维方式到「状态和与DOM同步」的思维方式的一种范式转换。useEffect 的目的是让你 **synchronize things outside of the React tree according to our props and state.** 

如果将「 `useEffect(fn, [])` 等同于 `componentDidMount()`」会有几个问题出现：

- 机制上它们其实是不一样的
- 从 class component 到 hooks 的重构本意并不是简单地用 `useEffect(fn，[])` 替换`componentDidMount()`。

- `useLayoutEffect(fn, [])` 比 `useEffect(fn, [])` 更接近 `componentDidMount()` 
- 在处理副作用上，如果 props 会改变，class 只能在 componentDidMount 和 componentDidUpdate 里重复写一样的副作用，useEffect 能统一处理这些副作用。
- useEffect 是异步的，componetDidMount 不是。

### 这是一个陷阱题 

*陷阱一* 

>  `useEffect(fn, [])` 不能等同于 `componentDidMount`，但能起到 `componentDidMount` 的作用。

错，useEffect 和 componentDiMount 就不是一个概念的东西。而且如果在 `componentDidMount` 里处理副作用的话，如果 props 改变了，在 `componentDidUpdate` 里还要再重复处理一遍这样的副作用。但如果用 hooks 的话能统一处理这些副作用。

*陷阱二* 

第二个参数是空数组，有些情况下可以这样做，但有些情况下并不好 [Is it safe to omit functions from the list of dependencies?](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) 

也有很多人认为 useEffect 就是 `componentDidMount` 和 `componentDidUpdate` 的结合，但实际上 useEffect 能比 `componentDidMount` 和 `componentDidUpdate` 的结合做得更多。这里 [例子](https://overreacted.io/a-complete-guide-to-useeffect/#are-functions-part-of-the-data-flow) 说明了 `useEffect` 的处理会比  `componentDidMount`  和  `componentDidUpdate` 结合起来处理更要省事很多。

**参考**

[useEffect(fn, []) is not the new componentDidMount()](https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/)

[Are Functions Part of the Data Flow?](https://overreacted.io/a-complete-guide-to-useeffect/#are-functions-part-of-the-data-flow) 

## useEffect 的 capture value 特性

### 例子一： 「componentDidMount 例子」重构成 「useEffect 例子」

看看这两个 demo
- demo1：[componentDidMount 例子](https://codesandbox.io/s/sleepy-leftpad-y74yr) 
- demo2：[useEffect 例子](https://codesandbox.io/s/bold-sinoussi-ff42j) 


结果是他们的行为上有了很大的不同。当我们在刷新页面后的 3 秒内，无论 demo2 点击了多少次，3 秒后，弹出的结果依然是 0 次。这是因为 useEffect 具有 catpure value 特性。

当 useEffect 被执行的时候，useEffect 会捕获当前 count 的值，useEffect 函数的回调函数里只会获取 useEffect 被执行时的 count 的值。简单来说，就只能获取 useEffect 被执行时的 count 的快照。componentDidMount 却是获取实时的 count 值。

### 能帮我们避免一些 bug 

> That [helps prevent bugs](https://overreacted.io/how-are-function-components-different-from-classes/) but in some cases can be annoying.

例子：[example from Dan Abramov](https://codesandbox.io/s/pjqnl16lm7) 

点击 follow，然后在网络请求响应之前切换 profile，会有关注成功后的提示错误的 bug。

例子：

```js
class UserProfile extends React.Component {
  state = { user: null }
  componentDidMount() {
    getUser(this.props.uid).then(user => {
      this.setState({ user })
    })
  }
  render() {
    // ...
  }
}
```

如果 uid props 变化了会发生什么？ 如果没有 `componentDidUpdate` ，那么就无法请求最新的 user。

总的来说就是，如果在 `componentDidMount` 里处理副作用的话，如果 prop 改变了，在 `componentDidUpdate` 里还要再重复处理一遍这样的副作用。但如果用 hooks 的话能统一处理这些副作用。

## 最后

改变生命周期的思维习惯吧，以后写代码时我们应该思考的是「With this state, what does my UI look like?」和「when this state changes, what side effects need to be re-ran」。

