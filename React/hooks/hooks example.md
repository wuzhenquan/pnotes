## useState 保存组件状态

```js
import React, { useState } from "react";
function App() {
  const [obj, setObject] = useState({
    count: 0,
    name: "alife"
  });
  return (
    <div className="App">
      Count: {obj.count}
      <button onClick={() => setObject({ ...obj, count: obj.count + 1 })}>+</button>
      <button onClick={() => setObject({ ...obj, count: obj.count - 1 })}>-</button>
    </div>
  );
}
```

似乎有个 useState 后，函数组件也可以拥有自己的状态了，但仅仅是这样完全不够。为什么不够？对于异步请求，需要完成一些异步请求后的副作用（也就是请求数据之后该怎么办的逻辑），useState 做不到完成这种副作用。

## useEffect 处理副作用

```js
import React, { useState, useEffect } from "react";
let timer = null;
function App() {
  const [count, setCount] = useState(0);
    
  // 一旦 count 值发生改变，则修改 document.title 值
  // 意思就是第二个参数变化时，会执行第一个函数参数的副作用。
  useEffect(() => {document.title = "componentDidMount" + count;},[count]);
  
  // useEffect 中数组没有传值，代表不监听任何参数变化，即只有在组件初始化或销毁的时候才会触发
  // 用来代替 componentDidMount 和 componentWillUnmount
  useEffect(() => {
    timer = setInterval(() => {setCount(prevCount => prevCount + 1);}, 1000);
    return () => {
      document.title = "componentWillUnmount";
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      Count: {count}
      <button onClick={() => clearInterval(timer)}>clear</button>
    </div>
  );
}
```

如果没有第二个参数

第二个参数如果为空数组，quoting the [docs](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects):

> This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.

If after that we still don’t use any values from the component scope, it’s safe to specify `[]`:

用 useEffect 可以模拟封装出其他生命周期函数，具体如何模拟？

## useContext 减少组件层级

```jsx
const colorContext = React.createContext("gray");
function Bar() {
  const color = useContext(colorContext);
  return <div>{color}</div>;
}
function Foo() {
  return <Bar />;
}
function App() {
  return (
    <colorContext.Provider value={"red"}>
      <Foo />
    </colorContext.Provider>
  );
}
```

使用 useContext 可以解决 Consumer 多状态嵌套的问题

```react
// Consumer 嵌套
function HeaderBar() {
  return (
    <CurrentUser.Consumer>
      {user =>
        <Notifications.Consumer>
          {notifications =>
            <header>
              Welcome back, {user.name}!
              You have {notifications.length} notifications.
            </header>
          }
      }
    </CurrentUser.Consumer>
  );
}
//  useContext 十分简洁
function HeaderBar() {
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);
  return (
    <header>
      Welcome back, {user.name}!
      You have {notifications.length} notifications.
    </header>
  );
}
```

## useReducer

```react
import React, { useReducer } from "react";
const initialState = {
  count: 0
};
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      throw new Error();
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 5 })}>
        -
      </button>
    </>
  );
}
```

## useCallback 记忆函数
[Is there something like instance variables?](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) 

在类组件中，我们经常犯下面这样的错误：

```react
class App {
  render() {
    return <div>
      <SomeComponent 
          style={{ fontSize: 14 }} 
          doSomething={ () => { console.log('do something'); }}  
      />
    </div>;
  }
}
```

这样写有什么坏处呢？一旦 App 组件的 props 或者状态改变了就会触发重渲染，即使跟 SomeComponent 组件不相关，由于每次 render 都会产生新的 style 和 doSomething，所以会导致 SomeComponent 重新渲染，倘若 SomeComponent 是一个大型的组件树，这样的 Virtual Dom 的比较显然是很浪费的，解决的办法也很简单，将参数抽离成变量。

```react
const fontSizeStyle = { fontSize: 14 };
class App {
    doSomething = () => {
        console.log('do something');
    }
    render() {
        return <div>
            <SomeComponent style={fontSizeStyle} doSomething={ this.doSomething }  />
        </div>;
    }
}
```

在类组件中，我们还可以通过 this 这个对象来存储函数，而在函数组件中没办法进行挂载了。所以函数组件在每次渲染的时候如果有传递函数的话都会重渲染子组件。

```react
function App() {
  const handleClick = () => {
    console.log('Click happened');
  }
  return <SomeComponent onClick={handleClick}>Click Me</SomeComponent>;
}
```

而有了 useCallback 就不一样了，你可以通过 useCallback 获得一个记忆后的函数。

```react
function App() {
  const memoizedHandleClick = useCallback(() => {
    console.log('Click happened')
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

老规矩，第二个参数传入一个数组，数组中的每一项一旦值或者引用发生改变，useCallback 就会重新返回一个新的记忆函数提供给后面进行渲染。

这样只要子组件继承了 PureComponent 或者使用 React.memo 就可以有效避免不必要的 VDOM 渲染

## useMemo 记忆组件

useCallback 的功能完全可以由 useMemo 所取代

前面使用 useCallback 的例子可以使用 useMemo 进行改写

```jsx
function App() {
  const memoizedHandleClick = useMemo(() => () => {
    console.log('Click happened')
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

唯一的区别是：**useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回给你。**所以在前面的例子中，可以返回 handleClick 来达到存储函数的目的。

所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数计算得到一个确定的值，比如记忆组件。

```jsx
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

## useRef 保存引用值

```jsx
import React, { useState, useRef } from "react";
function App() {
  let [name, setName] = useState("Nate");
  let nameRef = useRef();
  const submitButton = () => {
    setName(nameRef.current.value);
  };
  return (
    <div className="App">
      <p>{name}</p>

      <div>
        <input ref={nameRef} type="text" />
        <button type="button" onClick={submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
}
```

https://github.com/happylindz/blog/issues/19

We can think of them as a box where you can place any value q

## useImperativeHandle 透传 Ref

通过 useImperativeHandle 用于让父组件获取子组件内的索引

```jsx
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
function ChildInputComponent(props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);
  return <input type="text" name="child input" ref={inputRef} />;
}
const ChildInput = forwardRef(ChildInputComponent);
function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <ChildInput ref={inputRef} />
    </div>
  );
}
```

## useLayoutEffect 同步执行副作用
大部分情况下，使用 useEffect 就可以帮我们处理组件的副作用，但是如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 useLayoutEffect，useLayoutEffect 中的副作用会在 DOM 更新之后同步执行。

```jsx
function App() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const title = document.querySelector("#title");
    const titleWidth = title.getBoundingClientRect().width;
    console.log("useLayoutEffect");
    if (width !== titleWidth) {
      setWidth(titleWidth);
    }
  });
  useEffect(() => {
    console.log("useEffect");
  });
  return (
    <div>
      <h1 id="title">hello</h1>
      <h2>{width}</h2>
    </div>
  );
}
```